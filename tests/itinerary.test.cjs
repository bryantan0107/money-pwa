const {test}=require('node:test');
const assert=require('node:assert/strict');
const Itinerary=require('../itinerary.js');

const tapPoint=(time,overrides={})=>({key:'day-one',pointerId:1,primary:true,x:40,y:100,scroll:0,time,...overrides});
const tap=(gesture,start,end,overrides={})=>{gesture.down(tapPoint(start,overrides));return gesture.up(tapPoint(end,overrides));};
test('a quick double tap edits only once; a single tap stays in reading mode',()=>{
  const gesture=Itinerary.createDoubleTap();
  assert.equal(tap(gesture,0,70),false);assert.equal(tap(gesture,170,230),true);
  assert.equal(tap(gesture,300,360),false);
});
test('taps on different days, far-apart points, or slow taps do not open editing',()=>{
  for(const change of [{key:'other-day'},{x:100}]){
    const g=Itinerary.createDoubleTap();tap(g,0,50);assert.equal(tap(g,100,150,change),false);
  }
  const g=Itinerary.createDoubleTap();tap(g,0,50);assert.equal(tap(g,500,550),false);
  g.down(tapPoint(600));assert.equal(g.up(tapPoint(1100)),false);
});
test('scrolling, dragging and a cancelled or multi-touch gesture reset double taps',()=>{
  const scroll=Itinerary.createDoubleTap();tap(scroll,0,50);scroll.down(tapPoint(100));
  assert.equal(scroll.up(tapPoint(150,{scroll:40})),false);assert.equal(tap(scroll,200,250),false);
  const drag=Itinerary.createDoubleTap();tap(drag,0,50);drag.down(tapPoint(100));drag.move(tapPoint(120,{y:140}));
  assert.equal(drag.up(tapPoint(150)),false);assert.equal(tap(drag,200,250),false);
  const multi=Itinerary.createDoubleTap();tap(multi,0,50);multi.down(tapPoint(100,{primary:false}));
  assert.equal(multi.up(tapPoint(150)),false);assert.equal(tap(multi,200,250),false);
  multi.cancel();assert.equal(tap(multi,300,350),false);
});
test('an interactive target between taps prevents card editing',()=>{
  const g=Itinerary.createDoubleTap();tap(g,0,50);
  assert.equal(tap(g,100,150,{key:null}),false);assert.equal(tap(g,200,250),false);
});

test('trip dates include leap days and cross-year trips without timezone drift',()=>{
  assert.deepEqual(Itinerary.days({startDate:'2028-02-28',endDate:'2028-03-01'}),['2028-02-28','2028-02-29','2028-03-01']);
  assert.deepEqual(Itinerary.days({startDate:'2026-12-31',endDate:'2027-01-02'}),['2026-12-31','2027-01-01','2027-01-02']);
  assert.deepEqual(Itinerary.days({startDate:'2026-02-30',endDate:'2026-03-02'}),[]);
  assert.deepEqual(Itinerary.days({startDate:'2026-05-02',endDate:'2026-05-01'}),[]);
});
test('reading and changing a date range preserves all old notes and reveals other dates',()=>{
  const p={startDate:'2026-06-02',endDate:'2026-06-03',planText:'Hotel\nhttps://example.test',dailyPlans:[
    {date:'2026-06-01',note:'Arrival'}, {date:'2026-06-02',note:'City walk'}, {date:'2026-06-04',note:'Return'}]};
  const before=structuredClone(p);
  assert.deepEqual(Itinerary.otherPlans(p).map(p=>p.note),['Arrival','Return']);
  assert.deepEqual(p,before);
  p.startDate='2026-06-01';p.endDate='2026-06-04';assert.deepEqual(Itinerary.otherPlans(p),[]);
  assert.deepEqual(p.dailyPlans,before.dailyPlans);
});
test('editing or clearing one day retains other days and general notes',()=>{
  const p={planText:'Booking details',dailyPlans:[{date:'2026-06-01',note:'Flight'},{date:'2026-06-03',note:'Museum'}]};
  Itinerary.setDay(p,'2026-06-01','Hotel\nWalk\n');assert.equal(p.dailyPlans[0].note,'Hotel\nWalk');
  Itinerary.setDay(p,'2026-06-01','');assert.deepEqual(p.dailyPlans,[{date:'2026-06-03',note:'Museum'}]);
  assert.equal(p.planText,'Booking details');assert.throws(()=>Itinerary.setDay(p,'2026-02-30','Invalid'));
});
test('plain text is escaped and only http(s) links become clickable',()=>{
  const html=Itinerary.linkify('<img onerror=alert(1)>\njavascript:alert(1) https://example.test/map?a=1&b=2.');
  assert.ok(html.includes('&lt;img onerror=alert(1)&gt;'));
  assert.ok(!html.includes('href="javascript:'));
  assert.ok(html.includes('href="https://example.test/map?a=1&amp;b=2"'));
  assert.ok(html.includes('rel="noopener noreferrer"'));
  assert.ok(html.endsWith('</a>.'));
  assert.equal((Itinerary.linkify('https://a.test\nhttps://b.test').match(/<a /g)||[]).length,2);
  assert.ok(Itinerary.linkify('(https://example.test/Place_(City)).').includes('href="https://example.test/Place_(City)"'));
});
