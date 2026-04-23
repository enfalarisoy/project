import { useState } from "react";

const TABS = [
  { label: "Overview", id: "overview" },
  { label: "Policy Change", id: "policy-change" },
  { label: "Main Result", id: "main-result" },
  { label: "Mechanism", id: "mechanism" },
  { label: "Heterogeneity Analysis", id: "heterogeneity-analysis" },
];

function Callout({ color, bg, children }) {
  return (
    <div style={{ background: bg, borderLeft: "3px solid " + color, padding: "10px 14px", fontSize: 13, lineHeight: 1.6, marginBottom: 12, borderRadius: 4 }}>
      {children}
    </div>
  );
}
function Card({ label, value, sub, color }) {
  return (
    <div style={{ background:"#fff", border:"1px solid #e5e3de", borderRadius:8, padding:"12px 14px", flex:1 }}>
      <div style={{ fontSize:10, fontWeight:600, letterSpacing:"0.06em", textTransform:"uppercase", color:"#999", marginBottom:4 }}>{label}</div>
      <div style={{ fontSize:20, fontWeight:700, color:color, fontFamily:"Georgia,serif" }}>{value}</div>
      {sub && <div style={{ fontSize:11, color:"#888", marginTop:2 }}>{sub}</div>}
    </div>
  );
}
function Section({ title }) {
  return <div style={{ fontFamily:"Georgia,serif", fontSize:16, fontWeight:600, margin:"16px 0 10px" }}>{title}</div>;
}

function TabHeading({ title }) {
  return (
    <div style={{margin:"0 0 18px",paddingBottom:10,borderBottom:"1px solid #ddd"}}>
      <div style={{fontSize:10,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",color:"#999",marginBottom:4}}>Section</div>
      <h2 style={{fontFamily:"Georgia,serif",fontSize:24,margin:0,color:"#1a1a1a"}}>{title}</h2>
    </div>
  );
}

// ── POLICY: Step chart matching Image 1 ──
function PolicyStepChart() {
  const W=500, H=260, PL=50, PR=80, PT=20, PB=50;
  const cw=W-PL-PR, ch=H-PT-PB;
  const xMin=1,xMax=10,yMin=0,yMax=38;
  const cx = x => PL + (x-xMin)/(xMax-xMin)*cw;
  const cy = y => PT + (1-(y-yMin)/(yMax-yMin))*ch;

  // Fixed: flat at 5
  const fixedPts = [1,2,3,4,5,6,7,8,9,10].map(x=>({x,y:5}));
  // Dynamic: step function
  const dynSteps = [
    {x:1,y:5},{x:2,y:5},
    {x:2,y:10},{x:3,y:10},
    {x:3,y:15},{x:4,y:15},
    {x:4,y:20},{x:5,y:20},
    {x:5,y:25},{x:6,y:25},
    {x:6,y:30},{x:7,y:30},
    {x:7,y:35},{x:10,y:35},
  ];
  const dynDots = [{x:1,y:5},{x:2,y:5},{x:3,y:10},{x:4,y:15},{x:5,y:20},{x:6,y:25},{x:7,y:30},{x:8,y:35},{x:9,y:35},{x:10,y:35}];
  const dynLabels = [{x:3,y:10,label:"+10"},{x:4,y:15,label:"+15"},{x:5,y:20,label:"+20"},{x:6,y:25,label:"+25"},{x:7,y:30,label:"+30"},{x:8,y:35,label:"+35"},{x:9,y:35,label:"+35"},{x:10,y:35,label:"+35"}];
  const fixedLabels = [1,2,3,4,5,6,7,8,9,10].map(x=>({x,y:5,label:"+5"}));

  const fixedPath = fixedPts.map((p,i)=>(i===0?"M":"L")+cx(p.x).toFixed(1)+","+cy(p.y).toFixed(1)).join(" ");
  const dynPath = dynSteps.map((p,i)=>(i===0?"M":"L")+cx(p.x).toFixed(1)+","+cy(p.y).toFixed(1)).join(" ");

  const yTicks = [0,5,10,15,20,25,30,35];

  return (
    <svg viewBox={"0 0 "+W+" "+H} style={{width:"100%",maxWidth:W,display:"block"}}>
      {/* grid */}
      {yTicks.map(y=>(
        <g key={y}>
          <line x1={PL} y1={cy(y)} x2={W-PR} y2={cy(y)} stroke="#eee" strokeWidth={1}/>
          <text x={PL-6} y={cy(y)+4} textAnchor="end" fontSize={10} fill="#888">{y}</text>
        </g>
      ))}
      {[1,2,3,4,5,6,7,8,9,10].map(x=>(
        <text key={x} x={cx(x)} y={H-PB+16} textAnchor="middle" fontSize={10} fill="#888">{x}</text>
      ))}
      {/* axes */}
      <line x1={PL} y1={PT} x2={PL} y2={H-PB} stroke="#bbb" strokeWidth={1}/>
      <line x1={PL} y1={H-PB} x2={W-PR} y2={H-PB} stroke="#bbb" strokeWidth={1}/>
      {/* axis labels */}
      <text x={PL+cw/2} y={H-4} textAnchor="middle" fontSize={12} fontWeight="bold" fill="#333">Number of attempts</text>
      <text x={14} y={PT+ch/2} textAnchor="middle" fontSize={12} fontWeight="bold" fill="#333" transform={"rotate(-90,14,"+(PT+ch/2)+")"}> mₖ </text>
      {/* Fixed line (blue dashed) */}
      <path d={fixedPath} fill="none" stroke="#4472C4" strokeWidth={2.5} strokeDasharray="8,5"/>
      {fixedPts.map(p=><circle key={p.x} cx={cx(p.x)} cy={cy(p.y)} r={5} fill="#4472C4"/>)}
      {fixedLabels.map(l=><text key={l.x} x={cx(l.x)} y={cy(l.y)+18} textAnchor="middle" fontSize={9} fill="#4472C4">{l.label}</text>)}
      {/* Dynamic line (orange solid, step) */}
      <path d={dynPath} fill="none" stroke="#E07540" strokeWidth={2.5}/>
      {dynDots.map(p=><circle key={p.x} cx={cx(p.x)} cy={cy(p.y)} r={5} fill="#E07540"/>)}
      {dynLabels.map(l=><text key={l.x} x={cx(l.x)} y={cy(l.y)-9} textAnchor="middle" fontSize={10} fontWeight="bold" fill="#333">{l.label}</text>)}
      {/* Legend labels */}
      <text x={W-PR+6} y={cy(35)+4} fontSize={13} fontWeight="bold" fill="#333">Dynamic</text>
      <text x={W-PR+6} y={cy(5)+4} fontSize={13} fontWeight="bold" fill="#333">Fixed</text>
    </svg>
  );
}

// ── RESULTS: Event study matching Image 2 ──
function EventStudyChart() {
  const W=520, H=280, PL=50, PR=16, PT=20, PB=46;
  const cw=W-PL-PR, ch=H-PT-PB;
  const xMin=-40,xMax=40,yMin=-620,yMax=420;
  const cx = x => PL+(x-xMin)/(xMax-xMin)*cw;
  const cy = y => PT+(1-(y-yMin)/(yMax-yMin))*ch;

  // Pre-treatment: noisy around 0 with CI bars
  const prePts = [];
  for(let e=-35;e<0;e+=1){
    const y = Math.sin(e*0.8)*30 + Math.cos(e*0.5)*20 + (e < -25 ? Math.sin(e*1.2)*40 : 0);
    const ci = e < -28 ? 180 : 80;
    prePts.push({e,y,ci});
  }
  // Post-treatment
  const postPts = [];
  for(let e=0;e<=35;e++){
    let y;
    if(e===0) y=78;
    else if(e<=2) y=78-(78+100)*(e/2)*0.85;
    else if(e<=10) y=-100+Math.sin(e*0.6)*12;
    else if(e<=25) y=-110-Math.max(0,(e-15)*4)+Math.sin(e*0.8)*10;
    else y=-180-(e-25)*12;
    const ci = e>28 ? 200 : (e>20 ? 120 : 60);
    postPts.push({e,y:Math.max(-590,y),ci});
  }

  const prePath = prePts.map((p,i)=>(i===0?"M":"L")+cx(p.e).toFixed(1)+","+cy(p.y).toFixed(1)).join(" ");
  const postPath = postPts.map((p,i)=>(i===0?"M":"L")+cx(p.e).toFixed(1)+","+cy(p.y).toFixed(1)).join(" ");

  return (
    <svg viewBox={"0 0 "+W+" "+H} style={{width:"100%",maxWidth:W,display:"block"}}>
      {/* grid */}
      {[-400,-200,0,200,400].map(y=>(
        <g key={y}>
          <line x1={PL} y1={cy(y)} x2={W-PR} y2={cy(y)} stroke={y===0?"#ccc":"#eee"} strokeDasharray={y===0?"6,4":""} strokeWidth={y===0?1.5:1}/>
          <text x={PL-4} y={cy(y)+4} textAnchor="end" fontSize={9} fill="#aaa">{y}</text>
        </g>
      ))}
      {[-40,-30,-20,-10,0,10,20,30,40].map(e=>(
        <g key={e}>
          <line x1={cx(e)} y1={PT} x2={cx(e)} y2={H-PB} stroke="#eee" strokeWidth={1}/>
          <text x={cx(e)} y={H-PB+14} textAnchor="middle" fontSize={9} fill="#aaa">{e}</text>
        </g>
      ))}
      {/* CI bars */}
      {prePts.map(p=>(
        <line key={p.e} x1={cx(p.e)} y1={cy(p.y+p.ci)} x2={cx(p.e)} y2={cy(p.y-p.ci)} stroke="#93c4e8" strokeWidth={1.2}/>
      ))}
      {postPts.map(p=>(
        <line key={p.e} x1={cx(p.e)} y1={cy(Math.max(-610,p.y+p.ci))} x2={cx(p.e)} y2={cy(Math.max(-610,p.y-p.ci))} stroke="#f5a0b0" strokeWidth={1.2}/>
      ))}
      {/* Lines */}
      <path d={prePath} fill="none" stroke="#4472C4" strokeWidth={2}/>
      {prePts.map(p=><circle key={p.e} cx={cx(p.e)} cy={cy(p.y)} r={2.5} fill="#4472C4"/>)}
      <path d={postPath} fill="none" stroke="#b92d2d" strokeWidth={2}/>
      {postPts.map(p=><circle key={p.e} cx={cx(p.e)} cy={cy(p.y)} r={2.5} fill="#b92d2d"/>)}
      {/* Zero line */}
      <line x1={PL} y1={cy(0)} x2={W-PR} y2={cy(0)} stroke="#555" strokeDasharray="6,4" strokeWidth={1.5}/>
      {/* Treatment line */}
      <line x1={cx(0)} y1={PT} x2={cx(0)} y2={H-PB} stroke="#aaa" strokeDasharray="4,3" strokeWidth={1}/>
      {/* Annotations */}
      <text x={cx(3)} y={cy(160)} fontSize={11} fontWeight="bold" fill="#b92d2d" textAnchor="middle">ATT: +78.37***</text>
      <text x={cx(3)} y={cy(145)} fontSize={9} fill="#b92d2d" textAnchor="middle">(treatment bin)</text>
      {/* Arrow to dot */}
      <line x1={cx(2)} y1={cy(130)} x2={cx(0.3)} y2={cy(85)} stroke="#b92d2d" strokeWidth={1} markerEnd="url(#arr)"/>
      <defs><marker id="arr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#b92d2d"/></marker></defs>
      {/* Brace bins 1-10 */}
      <text x={cx(5)} y={cy(-200)} fontSize={11} fontWeight="bold" fill="#b92d2d" textAnchor="middle">ATT: −94.10***</text>
      <text x={cx(5)} y={cy(-218)} fontSize={9} fill="#b92d2d" textAnchor="middle">(bins 1–10)</text>
      {/* Brace bins 11+ */}
      <text x={cx(23)} y={cy(60)} fontSize={11} fontWeight="bold" fill="#b92d2d" textAnchor="middle">ATT: −87.31***</text>
      <text x={cx(23)} y={cy(42)} fontSize={9} fill="#b92d2d" textAnchor="middle">(bins 11+)</text>
      {/* Axis labels */}
      <text x={PL+cw/2} y={H-4} textAnchor="middle" fontSize={11} fill="#666">Periods to Treatment</text>
      <text x={12} y={PT+ch/2} textAnchor="middle" fontSize={11} fill="#666" transform={"rotate(-90,12,"+(PT+ch/2)+")"}> ATT </text>
    </svg>
  );
}

// ── MECHANISM: TikZ diagram recreation ──
function MechanismDiagram() {
  return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:14,padding:"8px 0"}}>
      <div style={{display:"grid",gridTemplateColumns:"minmax(180px,1fr) 44px minmax(180px,220px) 44px minmax(200px,1fr)",alignItems:"center",width:"100%",maxWidth:760,gap:10}}>
        <div style={{background:"#f4fcf5",border:"1px solid #7ec89a",borderRadius:10,padding:"14px 16px",minHeight:120,display:"flex",flexDirection:"column",justifyContent:"center"}}>
          <div style={{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.05em",color:"#2d7a3a",textAlign:"center",marginBottom:10}}>Expansion</div>
          <div style={{fontSize:12,color:"#26412c",lineHeight:1.7,textAlign:"left"}}>
            <div><span style={{color:"#2d7a3a",marginRight:8}}>☝</span><b style={{color:"#2d7a3a"}}>Player:</b> Accept</div>
            <div><span style={{color:"#2d7a3a",marginRight:8}}>📈</span><b style={{color:"#2d7a3a"}}>Firm:</b> Revenue</div>
          </div>
        </div>
        <div style={{textAlign:"center",fontSize:28,color:"#2d7a3a",fontWeight:700}}>←</div>
        <div style={{background:"#fff",border:"1.5px solid #8f8f8f",borderRadius:10,padding:"14px 16px",minHeight:104,display:"flex",flexDirection:"column",justifyContent:"center",textAlign:"center"}}>
          <div style={{fontSize:14,fontWeight:700,color:"#1a1a1a"}}>Dynamic</div>
          <div style={{fontSize:14,fontWeight:700,color:"#1a1a1a"}}>Post-Failure Offer</div>
          <div style={{fontSize:11,fontStyle:"italic",color:"#777",marginTop:4}}>(More moves per purchase)</div>
        </div>
        <div style={{textAlign:"center",fontSize:28,color:"#b92d2d",fontWeight:700}}>→</div>
        <div style={{background:"#fff5f5",border:"1px solid #ee9fa8",borderRadius:10,padding:"14px 16px",minHeight:120,display:"flex",flexDirection:"column",justifyContent:"center"}}>
          <div style={{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.05em",color:"#a12828",textAlign:"center",marginBottom:10}}>Acceleration &amp; Substitution</div>
          <div style={{fontSize:12,color:"#4a2a2a",lineHeight:1.7,textAlign:"left"}}>
            <div><span style={{color:"#b92d2d",marginRight:8}}>🏃</span><b style={{color:"#b92d2d"}}>Players:</b> Progress Faster</div>
            <div><span style={{color:"#b92d2d",marginRight:8}}>📊</span><b style={{color:"#b92d2d"}}>Firm:</b> Revenue</div>
          </div>
        </div>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",alignItems:"start",width:"100%",maxWidth:760}}>
        <div style={{textAlign:"center",fontSize:24,color:"#2d7a3a",fontWeight:700}}>↓</div>
        <div />
        <div style={{textAlign:"center",fontSize:24,color:"#b92d2d",fontWeight:700}}>↓</div>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:18,width:"100%",maxWidth:760,alignItems:"start"}}>
        <div style={{background:"#f4fcf5",border:"1px solid #52a96a",borderRadius:8,padding:"10px 14px",textAlign:"center"}}>
          <div style={{fontSize:13,fontWeight:700,color:"#2d7a3a"}}>Short-Run: +12.3%</div>
          <div style={{fontSize:11,color:"#555",marginTop:2}}>+78 coins/bin (TP = 0)</div>
          <div style={{fontSize:10,fontStyle:"italic",color:"#888",marginTop:2}}>Temporary</div>
        </div>
        <div />
        <div style={{background:"#fff3f3",border:"1px solid #d85f5f",borderRadius:8,padding:"10px 14px",textAlign:"center"}}>
          <div style={{fontSize:13,fontWeight:700,color:"#b92d2d"}}>Long-Run: −14.8%</div>
          <div style={{fontSize:11,color:"#555",marginTop:2}}>−94 coins/bin (TP = 1–10)</div>
          <div style={{fontSize:10,fontStyle:"italic",color:"#888",marginTop:2}}>Persistent</div>
        </div>
      </div>

      <div style={{background:"#fff0f0",border:"1.8px solid #b92d2d",borderRadius:10,padding:"12px 20px",textAlign:"center",width:"100%",maxWidth:420}}>
        <div style={{fontSize:14,fontWeight:700,color:"#b92d2d"}}>Net Effect: −12.8% overall spending decline</div>
        <div style={{fontSize:11,color:"#666",marginTop:2}}>−81 coins/bin, <i>p</i> &lt; 0.001</div>
      </div>
    </div>
  );
}

// ── MECHANISM: Strategic delay dot plot matching PDF ──
function StrategicDelayChart() {
  const data = [
    {k:1, v:-0.0943, ci:0.008, sig:"***"},
    {k:2, v:-0.0009, ci:0.004, sig:""},
    {k:3, v:0.0023,  ci:0.004, sig:""},
    {k:4, v:0.0128,  ci:0.003, sig:"***"},
    {k:5, v:0.0116,  ci:0.003, sig:"***"},
    {k:6, v:0.0135,  ci:0.003, sig:"***"},
    {k:7, v:0.0097,  ci:0.003, sig:"***"},
    {k:8, v:0.0453,  ci:0.004, sig:"***"},
  ];
  const W=460, H=220, PL=52, PR=20, PT=16, PB=44;
  const cw=W-PL-PR, ch=H-PT-PB;
  const xMin=0.5,xMax=8.5,yMin=-0.155,yMax=0.07;
  const cx = x => PL+(x-xMin)/(xMax-xMin)*cw;
  const cy = y => PT+(1-(y-yMin)/(yMax-yMin))*ch;

  const yTicks = [-0.15,-0.10,-0.05,0.00,0.05];
  return (
    <svg viewBox={"0 0 "+W+" "+H} style={{width:"100%",maxWidth:W,display:"block"}}>
      {/* grid */}
      {yTicks.map(y=>(
        <g key={y}>
          <line x1={PL} y1={cy(y)} x2={W-PR} y2={cy(y)} stroke="#eee" strokeWidth={1}/>
          <text x={PL-4} y={cy(y)+4} textAnchor="end" fontSize={9} fill="#888">{y.toFixed(2)}</text>
        </g>
      ))}
      {/* zero dashed */}
      <line x1={PL} y1={cy(0)} x2={W-PR} y2={cy(0)} stroke="#4472C4" strokeDasharray="6,4" strokeWidth={1.5}/>
      {/* border */}
      <rect x={PL} y={PT} width={cw} height={ch} fill="none" stroke="#ccc" strokeWidth={1}/>
      {/* CI bars + dots + labels */}
      {data.map(d=>(
        <g key={d.k}>
          <line x1={cx(d.k)} y1={cy(d.v+d.ci)} x2={cx(d.k)} y2={cy(d.v-d.ci)} stroke="#4472C4" strokeWidth={2}/>
          <line x1={cx(d.k)-4} y1={cy(d.v+d.ci)} x2={cx(d.k)+4} y2={cy(d.v+d.ci)} stroke="#4472C4" strokeWidth={1.5}/>
          <line x1={cx(d.k)-4} y1={cy(d.v-d.ci)} x2={cx(d.k)+4} y2={cy(d.v-d.ci)} stroke="#4472C4" strokeWidth={1.5}/>
          <circle cx={cx(d.k)} cy={cy(d.v)} r={6} fill="#4472C4"/>
          <text x={cx(d.k)} y={d.v > 0 ? cy(d.v+d.ci)-5 : cy(d.v-d.ci)+13} textAnchor="middle" fontSize={9} fill="#333">{d.v.toFixed(4)}{d.sig}</text>
        </g>
      ))}
      {/* x ticks */}
      {data.map(d=>(
        <text key={d.k} x={cx(d.k)} y={H-PB+14} textAnchor="middle" fontSize={10} fill="#888">{d.k}</text>
      ))}
      {/* axis labels */}
      <text x={PL+cw/2} y={H-4} textAnchor="middle" fontSize={11} fill="#555">Attempt</text>
      <text x={12} y={PT+ch/2} textAnchor="middle" fontSize={11} fill="#555" transform={"rotate(-90,12,"+(PT+ch/2)+")"}>% change</text>
    </svg>
  );
}

// ── HETEROGENEITY: 2x2 cluster event studies matching Image 3 ──
function ClusterEventStudy({ title, driver }) {
  const isHigh = driver === "acc";
  const W=220, H=140, PL=30, PR=6, PT=14, PB=26;
  const cw=W-PL-PR, ch=H-PT-PB;
  const xMin=-40,xMax=40;
  const yAbs = isHigh ? 1200 : 700;
  const cy = y => PT+(1-(y+yAbs)/(yAbs*2))*ch;
  const cx = x => PL+(x-xMin)/(xMax-xMin)*cw;

  const pre=[], post=[];
  for(let e=-35;e<0;e+=2){
    const y = Math.sin(e*0.9)*(isHigh?120:60)+Math.cos(e*0.5)*(isHigh?80:40);
    pre.push({e,y,ci:isHigh?300:180});
  }
  for(let e=0;e<=33;e+=1){
    let y;
    if(e===0) y=isHigh?-20:100;
    else y=(isHigh?-200:-60)-(e*(isHigh?12:3))+Math.sin(e*0.8)*(isHigh?60:30);
    post.push({e,y:Math.max(-yAbs*0.95,y),ci:e>26?(isHigh?500:300):(isHigh?200:100)});
  }
  const prePath = pre.map((p,i)=>(i===0?"M":"L")+cx(p.e).toFixed(1)+","+cy(p.y).toFixed(1)).join(" ");
  const postPath = post.map((p,i)=>(i===0?"M":"L")+cx(p.e).toFixed(1)+","+cy(p.y).toFixed(1)).join(" ");

  return (
    <svg viewBox={"0 0 "+W+" "+H} style={{width:"100%",display:"block"}}>
      <text x={W/2} y={10} textAnchor="middle" fontSize={7} fill="#666">{title}</text>
      {/* grid */}
      <line x1={PL} y1={cy(0)} x2={W-PR} y2={cy(0)} stroke="#bbb" strokeDasharray="4,3" strokeWidth={1}/>
      <rect x={PL} y={PT} width={cw} height={ch} fill="none" stroke="#ddd" strokeWidth={0.5}/>
      {[-40,-20,0,20,40].map(e=>(
        <text key={e} x={cx(e)} y={H-PB+10} textAnchor="middle" fontSize={7} fill="#aaa">{e}</text>
      ))}
      {/* CI bars */}
      {pre.map(p=><line key={p.e} x1={cx(p.e)} y1={cy(Math.min(yAbs*0.95,p.y+p.ci))} x2={cx(p.e)} y2={cy(Math.max(-yAbs*0.95,p.y-p.ci))} stroke="#93c4e8" strokeWidth={0.8}/>)}
      {post.map(p=><line key={p.e} x1={cx(p.e)} y1={cy(Math.min(yAbs*0.95,p.y+p.ci))} x2={cx(p.e)} y2={cy(Math.max(-yAbs*0.95,p.y-p.ci))} stroke="#f5a0b0" strokeWidth={0.8}/>)}
      {/* lines */}
      <path d={prePath} fill="none" stroke="#4472C4" strokeWidth={1.2}/>
      {pre.map(p=><circle key={p.e} cx={cx(p.e)} cy={cy(p.y)} r={1.5} fill="#4472C4"/>)}
      <path d={postPath} fill="none" stroke="#b92d2d" strokeWidth={1.2}/>
      {post.map(p=><circle key={p.e} cx={cx(p.e)} cy={cy(p.y)} r={1.5} fill="#b92d2d"/>)}
      {/* ATT label */}
      <text x={PL+2} y={PT+10} fontSize={7} fill="#666">ATT</text>
      <text x={PL+cw/2} y={H-2} textAnchor="middle" fontSize={7} fill="#666">Periods to Treatment</text>
    </svg>
  );
}

// ── HETEROGENEITY: Difficulty dot plot matching PDF ──
function DifficultyChart() {
  const data = [
    {d:1,att:-8.45,  ciLo:16.5,ciHi:0.3},
    {d:2,att:-13.20, ciLo:21.5,ciHi:5.0},
    {d:3,att:-15.16, ciLo:24.5,ciHi:5.5},
    {d:4,att:-15.84, ciLo:9.5, ciHi:8.5},
    {d:5,att:-12.16, ciLo:20.0,ciHi:5.0},
    {d:6,att:-11.27, ciLo:20.0,ciHi:5.0},
    {d:7,att:-10.08, ciLo:13.5,ciHi:3.5},
  ];
  const W=440, H=220, PL=48, PR=16, PT=16, PB=44;
  const cw=W-PL-PR, ch=H-PT-PB;
  const xMin=0.5,xMax=7.5,yMin=-26,yMax=3;
  const cx = x => PL+(x-xMin)/(xMax-xMin)*cw;
  const cy = y => PT+(1-(y-yMin)/(yMax-yMin))*ch;
  const yTicks = [-25,-20,-15,-10,-5,0];

  return (
    <svg viewBox={"0 0 "+W+" "+H} style={{width:"100%",maxWidth:W,display:"block"}}>
      {/* grid */}
      {yTicks.map(y=>(
        <g key={y}>
          <line x1={PL} y1={cy(y)} x2={W-PR} y2={cy(y)} stroke="#eee" strokeDasharray={y===0?"6,4":""} strokeWidth={y===0?1.5:1}/>
          <text x={PL-4} y={cy(y)+4} textAnchor="end" fontSize={9} fill="#888">{y}</text>
        </g>
      ))}
      {/* zero dashed black */}
      <line x1={PL} y1={cy(0)} x2={W-PR} y2={cy(0)} stroke="#555" strokeDasharray="6,4" strokeWidth={1.5}/>
      <rect x={PL} y={PT} width={cw} height={ch} fill="none" stroke="#ccc" strokeWidth={1}/>
      {/* CI bars + dots + labels */}
      {data.map(d=>(
        <g key={d.d}>
          <line x1={cx(d.d)} y1={cy(d.att+d.ciHi)} x2={cx(d.d)} y2={cy(d.att-d.ciLo)} stroke="#4472C4" strokeWidth={2}/>
          <line x1={cx(d.d)-5} y1={cy(d.att+d.ciHi)} x2={cx(d.d)+5} y2={cy(d.att+d.ciHi)} stroke="#4472C4" strokeWidth={1.5}/>
          <line x1={cx(d.d)-5} y1={cy(d.att-d.ciLo)} x2={cx(d.d)+5} y2={cy(d.att-d.ciLo)} stroke="#4472C4" strokeWidth={1.5}/>
          <circle cx={cx(d.d)} cy={cy(d.att)} r={6} fill="#4472C4"/>
          <text x={cx(d.d)+8} y={cy(d.att)+4} fontSize={9} fill="#333">{d.att}</text>
        </g>
      ))}
      {data.map(d=>(
        <text key={d.d} x={cx(d.d)} y={H-PB+14} textAnchor="middle" fontSize={10} fill="#888">{d.d}</text>
      ))}
      <text x={PL+cw/2} y={H-4} textAnchor="middle" fontSize={11} fill="#555">Difficulty</text>
      <text x={12} y={PT+ch/2} textAnchor="middle" fontSize={11} fill="#555" transform={"rotate(-90,12,"+(PT+ch/2)+")"}> ATT </text>
    </svg>
  );
}

function GameplayLoopDiagram() {
  const offer = (price) => ({
    background: "#fff7f7",
    border: "1px solid #d68585",
    borderRadius: 10,
    padding: "8px 10px",
    textAlign: "center",
    fontSize: 11,
    lineHeight: 1.35,
    fontWeight: 600,
    color: "#7c2d2d",
    minHeight: 62,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  });

  const play = {
    background: "#f3f7ff",
    border: "1px solid #89a8dc",
    borderRadius: 8,
    padding: "8px 10px",
    textAlign: "center",
    fontSize: 11,
    fontWeight: 700,
    color: "#274c87",
  };

  return (
    <div style={{display:"grid",gridTemplateColumns:"minmax(0,1fr) 150px",gap:18,alignItems:"start"}}>
      <div>
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:6}}>
          <div style={{background:"#f5f5f5",border:"1px solid #bcbcbc",borderRadius:8,padding:"8px 14px",fontSize:12,fontWeight:700}}>Start level L</div>
          <div style={{fontSize:20,color:"#666"}}>↓</div>
          <div style={{background:"#eefaf9",border:"1px solid #5ba8a2",borderRadius:8,padding:"8px 14px",fontSize:11,textAlign:"center",lineHeight:1.4}}>
            <div style={{fontWeight:700}}>Begin attempt k</div>
            <div>Offer size mₖ = f(k)</div>
          </div>
        </div>

        <div style={{marginTop:12,display:"grid",gridTemplateColumns:"1fr auto",columnGap:18}}>
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            <div style={play}>Start level</div>
            <div style={{fontSize:16,textAlign:"center",color:"#666"}}>↓</div>
            <div style={offer("900")}>Offer<div style={{fontWeight:400,color:"#555",marginTop:2}}>mₖ moves, 900 coins</div></div>
            <div style={{fontSize:10,color:"#777",textAlign:"center"}}>Accept</div>
            <div style={play}>Continue Attempt</div>
            <div style={{fontSize:16,textAlign:"center",color:"#666"}}>↓</div>
            <div style={offer("1900")}>Offer<div style={{fontWeight:400,color:"#555",marginTop:2}}>mₖ moves, 1,900 coins</div></div>
            <div style={{fontSize:10,color:"#777",textAlign:"center"}}>Accept</div>
            <div style={play}>Continue Attempt</div>
            <div style={{fontSize:16,textAlign:"center",color:"#666"}}>↓</div>
            <div style={offer("2700")}>Offer<div style={{fontWeight:400,color:"#555",marginTop:2}}>mₖ moves, 2,700 coins</div></div>
            <div style={{fontSize:10,color:"#777",textAlign:"center"}}>Accept</div>
            <div style={play}>Continue Attempt</div>
            <div style={{fontSize:16,textAlign:"center",color:"#666"}}>↓</div>
            <div style={offer("3600")}>Offer<div style={{fontWeight:400,color:"#555",marginTop:2}}>mₖ moves, 3,600 coins</div></div>
            <div style={{fontSize:10,color:"#777",textAlign:"center"}}>Accept</div>
            <div style={play}>Continue Attempt</div>
            <div style={{fontSize:18,textAlign:"center",color:"#888"}}>⋮</div>
          </div>
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:34,paddingTop:2}}>
            <div style={{background:"#eefaf9",border:"1px solid #5ba8a2",borderRadius:8,padding:"8px 12px",fontSize:11,fontWeight:700}}>Next level</div>
            <div style={{fontSize:10,color:"#777",textAlign:"center"}}>Pass<br/>k resets to 1</div>
            <div style={{fontSize:10,color:"#777",textAlign:"center"}}>Pass</div>
            <div style={{fontSize:10,color:"#777",textAlign:"center"}}>Pass</div>
            <div style={{fontSize:10,color:"#777",textAlign:"center"}}>Pass</div>
            <div style={{fontSize:10,color:"#777",textAlign:"center"}}>Pass</div>
          </div>
        </div>
        <div style={{marginTop:10,fontSize:10,color:"#777",textAlign:"center"}}>Declining an offer starts a new attempt: k ← k+1, and price resets to 900.</div>
      </div>

      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        <img src="./graph1.png" style={{width:"100%",borderRadius:8,display:"block"}} alt="Offer size by attempt"/>
      </div>
    </div>
  );
}

function FirstAcceptTimingDiagram() {
  const attempts = [
    {n:1, mark:"x", active:true},
    {n:2, mark:"x", active:true},
    {n:3, mark:"check", active:true, highlight:true},
    {n:4, mark:"dash"},
    {n:5, mark:"dash"},
    {n:6, mark:"checkGray", active:true},
    {n:7, mark:"dash"},
    {n:8, mark:"dash"},
  ];

  return (
    <div style={{background:"#fff",border:"1px solid #e5e3de",borderRadius:8,padding:"16px 14px",marginBottom:12}}>
      <div style={{fontSize:10,color:"#888",textAlign:"center",textTransform:"uppercase",letterSpacing:"0.05em",marginBottom:10}}>Attempt number to a level</div>
      <div style={{display:"flex",justifyContent:"center",gap:10,flexWrap:"wrap",marginBottom:10}}>
        {attempts.map(a=>(
          <div key={a.n} style={{display:"flex",flexDirection:"column",alignItems:"center",minWidth:42}}>
            <div style={{
              width:36,height:36,borderRadius:6,border:"1px solid "+(a.highlight ? "#3f6fd9" : "#d1d1d1"),
              background:a.highlight ? "#dce7ff" : "#f0f0f0", display:"flex",alignItems:"center",justifyContent:"center",
              fontSize:13,fontWeight:a.highlight ? 700 : 500,color:"#333"
            }}>{a.n}</div>
            <div style={{fontSize:14,color:"#999",lineHeight:1,margin:"4px 0"}}>{a.active ? "↓" : " "}</div>
            <div style={{
              height:18,fontSize:15,fontWeight:700,
              color:a.mark==="x" ? "#d35656" : a.mark==="check" ? "#3f6fd9" : a.mark==="checkGray" ? "#888" : "#b9b9b9"
            }}>
              {a.mark==="x" ? "×" : a.mark==="check" || a.mark==="checkGray" ? "✓" : "—"}
            </div>
          </div>
        ))}
      </div>
      <div style={{textAlign:"center",color:"#3f6fd9",fontSize:12,fontWeight:700,marginBottom:8}}>First accepted offer recorded at position k = 3</div>
      <div style={{textAlign:"center",fontSize:10,color:"#888"}}>Attempt 6 may also be accepted later, but only the first accepted offer is recorded.</div>
    </div>
  );
}

function OverviewMechanismMini() {
  return (
    <div style={{background:"#fff",border:"1px solid #e5e3de",borderRadius:8,padding:"16px",marginBottom:12}}>
      <div style={{display:"grid",gridTemplateColumns:"minmax(180px,1fr) 44px minmax(180px,220px) 44px minmax(180px,1fr)",alignItems:"center",gap:10}}>
        <div style={{background:"#f4fcf5",border:"1px solid #7ec89a",borderRadius:10,padding:"14px 16px",minHeight:108,display:"flex",flexDirection:"column",justifyContent:"center"}}>
          <div style={{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.05em",color:"#2d7a3a",textAlign:"center",marginBottom:8}}>Expansion</div>
          <div style={{fontSize:12,color:"#26412c",lineHeight:1.7}}>
            <div><span style={{color:"#2d7a3a",marginRight:8}}>☝</span><b style={{color:"#2d7a3a"}}>Player:</b> Accept ↑</div>
            <div><span style={{color:"#2d7a3a",marginRight:8}}>📈</span><b style={{color:"#2d7a3a"}}>Firm:</b> Revenue ↑</div>
          </div>
        </div>
        <div style={{textAlign:"center",fontSize:26,color:"#2d7a3a",fontWeight:700}}>←</div>
        <div style={{background:"#fff",border:"1.5px solid #8f8f8f",borderRadius:10,padding:"14px 16px",minHeight:94,display:"flex",flexDirection:"column",justifyContent:"center",textAlign:"center"}}>
          <div style={{fontSize:14,fontWeight:700,color:"#1a1a1a"}}>Dynamic</div>
          <div style={{fontSize:14,fontWeight:700,color:"#1a1a1a"}}>Post-Failure Offer</div>
          <div style={{fontSize:11,fontStyle:"italic",color:"#777",marginTop:4}}>(More moves per purchase)</div>
        </div>
        <div style={{textAlign:"center",fontSize:26,color:"#b92d2d",fontWeight:700}}>→</div>
        <div style={{background:"#fff5f5",border:"1px solid #ee9fa8",borderRadius:10,padding:"14px 16px",minHeight:108,display:"flex",flexDirection:"column",justifyContent:"center"}}>
          <div style={{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.05em",color:"#a12828",textAlign:"center",marginBottom:8}}>Acceleration</div>
          <div style={{fontSize:12,color:"#4a2a2a",lineHeight:1.7}}>
            <div><span style={{color:"#b92d2d",marginRight:8}}>🏃</span><b style={{color:"#b92d2d"}}>Player:</b> Progress Faster ↑</div>
            <div><span style={{color:"#b92d2d",marginRight:8}}>📊</span><b style={{color:"#b92d2d"}}>Firm:</b> Revenue ↓</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── TABS ───
function Overview() {
  return (
    <div>
      <TabHeading title="Overview"/>
      <Section title="Video Game Industry"/>
      <div style={{background:"#fff",border:"1px solid #e5e3de",borderRadius:8,padding:"14px",marginBottom:12}}>
        <ul style={{margin:"0 0 12px 18px",padding:0,fontSize:13,color:"#444",lineHeight:1.7}}>
          <li>Video games are one of the fastest-growing segments of the entertainment industry.</li>
          <li>Expected to generate about <b>$400B</b> in revenue by 2027 (Deloitte, 2024).</li>
          <li>Growth is driven by expansion across platforms: console, PC, and especially <b>mobile</b>.</li>
        </ul>
        <img src="./rpimagep1.png" style={{width:"100%",maxWidth:620,margin:"0 auto",display:"block",borderRadius:4}} alt="Video game industry growth"/>
      </div>

      <Section title="The Rise of Mobile Gaming"/>
      <div style={{background:"#fff",border:"1px solid #e5e3de",borderRadius:8,padding:"14px",marginBottom:12}}>
        <ul style={{margin:"0 0 0 18px",padding:0,fontSize:13,color:"#444",lineHeight:1.7}}>
          <li><b>1997:</b> <i>Snake</i> was introduced with Nokia 6110.</li>
          <li><b>2008:</b> <i>Pac-Man</i> became the first game in Google Play Store.</li>
          <li><b>2012:</b> <i>Candy Crush Saga</i> launched on mobile and reached about $1M in daily revenue by early 2013.</li>
          <li><b>Today:</b> Mobile makes up roughly <b>50%</b> of total video game industry revenue with more than <b>2B players</b> worldwide.</li>
        </ul>
      </div>

      <Section title="Monetization in Mobile Games"/>
      <div style={{background:"#fff",border:"1px solid #e5e3de",borderRadius:8,padding:"14px",marginBottom:12}}>
        <ul style={{margin:"0 0 12px 18px",padding:0,fontSize:13,color:"#444",lineHeight:1.7}}>
          <li>Most mobile games are <b>free to download</b>.</li>
          <li>Instead of upfront payment, they monetize through ads and in-game purchases.</li>
          <li>In-game purchases include microtransactions such as extra lives, extra moves, and boosters.</li>
        </ul>
        <img src="./imagefor3.png" style={{width:"100%",maxWidth:620,margin:"0 auto",display:"block",borderRadius:4}} alt="Mobile game monetization"/>
      </div>

      <Section title="The Downsides of Ads"/>
      <div style={{background:"#fff",border:"1px solid #e5e3de",borderRadius:8,padding:"14px",marginBottom:12}}>
        <ul style={{margin:"0 0 0 18px",padding:0,fontSize:13,color:"#444",lineHeight:1.7}}>
          <li>Players dislike ads.</li>
          <li>Games have limited control over which ads are shown.</li>
          <li>Ads create friction that harms gameplay (Deloitte, 2025).</li>
          <li>About 3-6% of users quit on their first ad encounter, and disruptive ad features can raise quit rates to 9-11%.</li>
        </ul>
      </div>

      <Section title="Industry Transition: Ads to In-Game Purchases"/>
      <div style={{background:"#fff",border:"1px solid #e5e3de",borderRadius:8,padding:"14px",marginBottom:12}}>
        <ul style={{margin:"0 0 0 18px",padding:0,fontSize:13,color:"#444",lineHeight:1.7}}>
          <li>Recent hits such as <i>Monopoly Go!</i>, <i>Royal Kingdom</i>, and <i>Royal Match</i> are completely ad-free.</li>
          <li>Even legacy titles are reducing ads; <i>Candy Crush</i> announced in January 2026 that it is testing ad removal.</li>
          <li>Leading games have shifted toward <b>microtransaction-driven</b> revenue models.</li>
        </ul>
      </div>

      <Section title="Key Monetization Tool: Post-Failure Bonus Actions"/>
      <div style={{background:"#fff",border:"1px solid #e5e3de",borderRadius:8,padding:"14px",marginBottom:12}}>
        <ul style={{margin:"0 0 0 18px",padding:0,fontSize:13,color:"#444",lineHeight:1.7}}>
          <li>Bonus actions are extra moves or lives offered for in-game currency after failure.</li>
          <li>They let players continue from the point of failure without restarting the level.</li>
        </ul>
      </div>

      <div style={{display:"flex",gap:8,marginBottom:12,flexWrap:"wrap"}}>
        <Card label="Short-Run" value="+12.3%" sub="+78 coins/bin, first 10 levels" color="#2563b0"/>
        <Card label="Long-Run"  value="−14.8%" sub="−94 coins/bin, persistent"      color="#b92d2d"/>
        <Card label="Overall ATT" value="−12.8%" sub="−81 coins/bin, p<0.001"       color="#b92d2d"/>
      </div>
      <Callout color="#b92d2d" bg="#fff0f0">
        <b>Central finding:</b> The dynamic policy generates a short-run spending increase that reverses into a persistent long-run decline. Short-horizon A/B tests overstate long-run profitability.
      </Callout>
      <Section title="Setting"/>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:12}}>
        {[
          {label:"Partner",val:"Turkish mobile game co.",sub:"2M+ active players · 5M+ downloads"},
          {label:"Sample", val:"Levels 200–548",sub:"7,431 treated · 3.5M+ observations"},
          {label:"Policy change",val:"August 10, 2024",sub:"Fixed → Dynamic post-failure offers"},
        ].map(({label,val,sub})=>(
          <div key={label} style={{background:"#fff",border:"1px solid #e5e3de",borderRadius:8,padding:"10px 12px"}}>
            <div style={{fontSize:10,fontWeight:600,textTransform:"uppercase",color:"#999",marginBottom:4}}>{label}</div>
            <div style={{fontSize:12,fontWeight:600}}>{val}</div>
            <div style={{fontSize:11,color:"#888"}}>{sub}</div>
          </div>
        ))}
      </div>
      <Section title="Method"/>
      <div style={{background:"#fff",border:"1px solid #e5e3de",borderRadius:8,padding:"12px 14px",fontSize:13,color:"#444",lineHeight:1.7}}>
        Staggered DiD using <b>Callaway &amp; Sant'Anna (2021)</b>. Treatment timing = first level with a dynamic offer (level progression as time dimension). Avoids negative-weight TWFE contamination. Robustness: matched never-treated controls (Mahalanobis) + ETWFE (Wooldridge 2023).
      </div>
    </div>
  );
}

function Policy() {
  return (
    <div>
      <TabHeading title="Policy Change"/>
      <div style={{background:"#fff",border:"1px solid #e5e3de",borderRadius:8,padding:"14px",marginBottom:12}}>
        <div style={{fontSize:11,fontWeight:600,textTransform:"uppercase",color:"#999",marginBottom:10}}>Offer size by attempt</div>
        <img src="./graph1.png" style={{width:"100%",borderRadius:8,display:"block"}} alt="Graph 1"/>
      </div>
      <div style={{background:"#fff",border:"1px solid #e5e3de",borderRadius:8,padding:"12px",marginBottom:14,overflowX:"auto"}}>
        <table style={{width:"100%",maxWidth:720,margin:"0 auto",borderCollapse:"collapse",fontSize:10,minWidth:640}}>
          <thead>
            <tr>
              <th style={{padding:"4px 6px",borderBottom:"1px solid #ddd",textAlign:"left"}}></th>
              <th style={{padding:"4px 6px",borderBottom:"1px solid #ddd",textAlign:"left"}}>Price</th>
              {["1","2","3","4","5","6","7","8+"].map(h=>(
                <th key={h} style={{padding:"4px 6px",borderBottom:"1px solid #ddd",textAlign:"center"}}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={10} style={{padding:"6px",fontStyle:"italic",color:"#555",background:"#faf9f6",borderTop:"1px solid #eee",borderBottom:"1px solid #eee"}}>Fixed policy (pre-Aug 10): all offers = 5 moves</td>
            </tr>
            {[
              ["1st","900"],["2nd","1900"],["3rd","2700"],["4th+","3600"]
            ].map(([label,price])=>(
              <tr key={label}>
                <td style={{padding:"5px 6px",borderBottom:"1px solid #f0efeb",fontWeight:600}}>{label}</td>
                <td style={{padding:"5px 6px",borderBottom:"1px solid #f0efeb"}}>{price}</td>
                {Array.from({length:8}).map((_,i)=>(
                  <td key={i} style={{padding:"5px 6px",borderBottom:"1px solid #f0efeb",textAlign:"center"}}>5</td>
                ))}
              </tr>
            ))}
            <tr>
              <td colSpan={10} style={{padding:"6px",fontStyle:"italic",color:"#555",background:"#faf9f6",borderTop:"1px solid #eee",borderBottom:"1px solid #eee"}}>Dynamic policy (post-Aug 10): offers grow with attempts</td>
            </tr>
            {[
              ["1st","900"],["2nd","1900"],["3rd","2700"],["4th+","3600"]
            ].map(([label,price])=>(
              <tr key={label}>
                <td style={{padding:"5px 6px",borderBottom:"1px solid #f0efeb",fontWeight:600}}>{label}</td>
                <td style={{padding:"5px 6px",borderBottom:"1px solid #f0efeb"}}>{price}</td>
                {["5","5","10","15","20","25","30","35"].map((v,i)=>(
                  <td key={i} style={{padding:"5px 6px",borderBottom:"1px solid #f0efeb",textAlign:"center",fontWeight: i >= 2 ? 700 : 400,color: i >= 2 ? "#b06010" : "#333"}}>{v}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Callout color="#2563b0" bg="#eff5ff">
        <b>Pricing (unchanged by policy):</b> 1st offer = 900 · 2nd = 1,900 · 3rd = 2,700 · 4th+ = 3,600 coins. Resets at each new attempt.
      </Callout>
    </div>
  );
}

function Results() {
  return (
    <div>
      <TabHeading title="Main Result"/>
      <Callout color="#2563b0" bg="#eff5ff">
        <b>Research question:</b> How does switching from a fixed to a dynamic post-failure offer policy affect players' intertemporal spending in mobile games?
      </Callout>
      <OverviewMechanismMini/>
      <Callout color="#2563b0" bg="#eff5ff">
        Estimated via <b>Callaway &amp; Sant'Anna (2021)</b> staggered DiD. 35 ten-level bins, levels 200–548. Not-yet-treated players as control group.
      </Callout>
      <div style={{display:"flex",gap:8,marginBottom:12}}>
        <Card label="TP = 0 (treatment bin)" value="+78" sub="+12.3% vs pre-mean 635 coins" color="#2563b0"/>
        <Card label="TP = 1–10" value="−94" sub="−14.8%, persistent decline" color="#b92d2d"/>
        <Card label="TP = 11+" value="−87" sub="−13.7%, continues declining" color="#b92d2d"/>
      </div>
      <Callout color="#b92d2d" bg="#fff0f0">
        <b>A/B testing trap:</b> A short-horizon test captures only the +12.3% spike. The persistent −14.8% long-run decline is invisible to standard industry experiments.
      </Callout>
      <Section title="Total Coin Spending for Post-failure Offers"/>
      <div style={{background:"#fff",border:"1px solid #e5e3de",borderRadius:8,padding:"14px",marginBottom:12}}>
        <div style={{fontSize:11,fontWeight:600,textTransform:"uppercase",color:"#999",marginBottom:10}}>Total Coin Spending for Post-failure Offers</div>
        <img src="./total_coin_spending_post_failure_offers.png" style={{width:"100%",borderRadius:4}} alt="Total Coin Spending for Post-failure Offers"/>
      </div>
      <div style={{background:"#fff",border:"1px solid #e5e3de",borderRadius:8,padding:"14px",marginBottom:12}}>
        <div style={{fontSize:12,fontWeight:700,marginBottom:8}}>Key result summary</div>
        <ul style={{margin:"0 0 0 18px",padding:0,fontSize:13,color:"#444",lineHeight:1.7}}>
          <li>Short run: Spending <b>increases</b> immediately after treatment.</li>
          <li>Long run: Spending <b>declines</b> as players progress through levels.</li>
          <li>Treatment bin: Temporary <b>12% increase</b>.</li>
          <li>Subsequent bins: Persistent <b>15% decline</b>.</li>
          <li><b>Implication:</b> Short-horizon A/B tests overstate performance.</li>
        </ul>
      </div>
      <Callout color="#2d7a3a" bg="#f0faf2">
        <b>−9.43 p.p. drop at attempt 1</b>; acceptance rises from attempt 3 onward where larger bundles are available at the same 900-coin price. Consistent with strategic waiting.
      </Callout>
      <div style={{background:"#fff",border:"1px solid #e5e3de",borderRadius:8,padding:"14px",marginBottom:12,overflowX:"auto"}}>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:12,minWidth:620}}>
          <thead>
            <tr>
              <th style={{padding:"6px 8px",borderBottom:"1px solid #ddd",textAlign:"left"}}></th>
              <th style={{padding:"6px 8px",borderBottom:"1px solid #ddd",textAlign:"center"}}>CS<br/>Not-Yet-Treated</th>
              <th style={{padding:"6px 8px",borderBottom:"1px solid #ddd",textAlign:"center"}}>CS<br/>Never-Treated</th>
              <th style={{padding:"6px 8px",borderBottom:"1px solid #ddd",textAlign:"center"}}>ETWFE<br/>Not-Yet-Treated</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["ATT","−81.43***","−70.92***","−58.71***"],
              ["","(17.39)","(15.62)","(13.74)"],
              ["Pre-treatment mean","635.2","635.2","635.2"],
              ["Observations","247,962","354,970","247,962"],
            ].map((row,idx)=>(
              <tr key={idx}>
                {row.map((cell,i)=>(
                  <td key={i} style={{padding:"7px 8px",borderBottom:"1px solid #f0efeb",textAlign:i===0?"left":"center",fontWeight: idx===0 && i>0 ? 700 : 400}}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Callout color="#2563b0" bg="#eff5ff">
        <div>Dynamic policy <b>reduces</b> total coin spending by <b>about 81 coins</b> per bin.</div>
        <div>That is roughly a <b>13% decrease</b> relative to the pre-treatment mean.</div>
        <div>Results are consistent across specifications.</div>
        <div><b>Net effect:</b> Long-run decline dominates the short-run increase.</div>
      </Callout>
    </div>
  );
}

function Mechanism() {
  return (
    <div>
      <TabHeading title="Mechanism"/>
      <Section title="Decomposition of Total Coin Spent on Post-failure Offers"/>
      <Callout color="#2563b0" bg="#eff5ff">
        Reminder: 1st offer = 900 coins; 2nd+ offers = 1,900-3,600 coins (2-4x higher).
      </Callout>
      <div style={{display:"flex",gap:8,marginBottom:12}}>
        <Card label="TCS1 (1st offer, 900 coins)"             value="−23" sub="−4.3%, not significant" color="#999"/>
        <Card label="TCSGE2 (2nd+ offers, 1,900–3,600 coins)" value="−58" sub="−62.4%, p<0.001"        color="#b92d2d"/>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12}}>
        <div style={{background:"#fff",border:"1px solid #e5e3de",borderRadius:8,padding:"12px"}}>
          <img src="./TCS1_Not_Yet_Treated_HQ.png" style={{width:"100%",borderRadius:4,display:"block",marginBottom:8}} alt="Coin spending on first offer"/>
          <div style={{fontSize:11,color:"#666",textAlign:"center"}}>(a) Coin Spending on 1st Offer</div>
        </div>
        <div style={{background:"#fff",border:"1px solid #e5e3de",borderRadius:8,padding:"12px"}}>
          <img src="./TCSGE2_Not_Yet_Treated_HQ.png" style={{width:"100%",borderRadius:4,display:"block",marginBottom:8}} alt="Coin spending on subsequent offers"/>
          <div style={{fontSize:11,color:"#666",textAlign:"center"}}>(b) Coin Spending on Subsequent Offers</div>
        </div>
      </div>
      <div style={{background:"#fff",border:"1px solid #e5e3de",borderRadius:8,padding:"14px",marginBottom:12}}>
        <ul style={{margin:"0 0 0 18px",padding:0,fontSize:13,color:"#444",lineHeight:1.7}}>
          <li>1st offer: Short-run increase, no long-run effect (−23 coins, not significant).</li>
          <li>2nd+ offers: Large and persistent decline (−58*** coins, −62%).</li>
          <li>Reduced spending is driven by the <b>decline in costly repeat continues</b>.</li>
        </ul>
      </div>
      <Callout color="#b92d2d" bg="#fff0f0">
        Players replace costly subsequent continuations with a single cheaper first offer that now grants more moves under the dynamic policy.
      </Callout>
      <Callout color="#b92d2d" bg="#fff0f0">
        Players can strategically wait for larger bundles at the same price.
      </Callout>
      <Section title="Delay in First-Accept Timing"/>
      <FirstAcceptTimingDiagram/>
      <div style={{background:"#fff",border:"1px solid #e5e3de",borderRadius:8,padding:"14px",marginBottom:12}}>
        <div style={{fontSize:13,color:"#444",lineHeight:1.7,marginBottom:10}}>Paired regression is estimated separately for each position k in 1,...,8 for each player i and matched pair p.</div>
        <div style={{background:"#f8f7f4",border:"1px solid #e8e5dd",borderRadius:6,padding:"16px 12px",color:"#222",textAlign:"center",overflowX:"auto"}}>
          <div style={{fontFamily:"Times New Roman, Georgia, serif",fontSize:22,lineHeight:1.5,whiteSpace:"nowrap"}}>
            <span>RatioAccepted</span><sub>ip</sub><sup>k</sup>
            <span> = </span>
            <span>&alpha;</span><sub>k</sub>
            <span> + </span>
            <span>&beta;</span><sub>k</sub>
            <span> After</span><sub>ip</sub>
            <span> + </span>
            <span>&gamma;</span><sub>k</sub>
            <span> NewPolicy</span><sub>ip</sub>
            <span> + </span>
            <span>&mu;</span><sub>p</sub>
            <span> + </span>
            <span>&epsilon;</span><sub>ip</sub><sup>k</sup>
          </div>
        </div>
        <div style={{fontSize:12,color:"#666",lineHeight:1.6,marginTop:10}}>Here, gamma_k captures the shift in the share of <b>first</b> accepted offers at position k.</div>
      </div>
      <div style={{background:"#fff",border:"1px solid #e5e3de",borderRadius:8,padding:"12px",marginBottom:12}}>
        <img src="./strg_wait.pdf.png" style={{width:"100%",borderRadius:4,display:"block"}} alt="Strategic waiting"/>
      </div>
      <div style={{background:"#fff",border:"1px solid #e5e3de",borderRadius:8,padding:"14px",marginBottom:12}}>
        <ul style={{margin:"0 0 0 18px",padding:0,fontSize:13,color:"#444",lineHeight:1.7}}>
          <li>Players delay first acceptance toward later, larger offers.</li>
          <li>9 p.p. drop at attempt 1; increases from attempt 3 onward.</li>
          <li>Consistent with <b>strategic waiting</b>.</li>
        </ul>
      </div>

      <Section title="Level Progression Pace"/>
      <div style={{background:"#fff",border:"1px solid #e5e3de",borderRadius:8,padding:"14px",marginBottom:12,overflowX:"auto"}}>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:12,minWidth:560}}>
          <thead>
            <tr>
              <th style={{padding:"6px 8px",borderBottom:"1px solid #ddd",textAlign:"left"}}></th>
              <th style={{padding:"6px 8px",borderBottom:"1px solid #ddd",textAlign:"center"}}>CS NYT</th>
              <th style={{padding:"6px 8px",borderBottom:"1px solid #ddd",textAlign:"center"}}>CS Matched</th>
              <th style={{padding:"6px 8px",borderBottom:"1px solid #ddd",textAlign:"center"}}>ETWFE NYT</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["ATT","−1.90***","0.11","−0.98***"],
              ["","(0.29)","(0.27)","(0.24)"],
              ["Pre-treatment mean","28.39","28.39","28.39"],
            ].map((row,idx)=>(
              <tr key={idx}>
                {row.map((cell,i)=>(
                  <td key={i} style={{padding:"7px 8px",borderBottom:"1px solid #f0efeb",textAlign:i===0?"left":"center",fontWeight: idx===0 && i>0 ? 700 : 400}}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{background:"#fff",border:"1px solid #e5e3de",borderRadius:8,padding:"14px"}}>
        <ul style={{margin:"0 0 0 18px",padding:0,fontSize:13,color:"#444",lineHeight:1.7}}>
          <li>While strategic delay could slow progression, the estimates are consistent with faster completion.</li>
          <li>One explanation is that larger offers provide more moves and increase success probability.</li>
        </ul>
      </div>
      <Section title="Mechanism Summary"/>
      <div style={{background:"#fff",border:"1px solid #e5e3de",borderRadius:8,padding:"16px",marginTop:14}}>
        <MechanismDiagram/>
      </div>
    </div>
  );
}

function Heterogeneity() {
  const clusters = [
    {name:"High Skill · High Spend (C4)", n:1601, pct:-28.5, sr:-23,  lr:-244, driver:"acc", title:"TCSS Cluster 4: High Skill-High Spend, By 10 Level"},
    {name:"High Skill · Low Spend (C3)",  n:989,  pct:-27.4, sr:-1,   lr:-180, driver:"acc", title:"TCSS Cluster 3: High Skill-Low Spend By 10 Level"},
    {name:"Low Skill · High Spend (C1)",  n:2346, pct:-5.1,  sr:142,  lr:-51,  driver:"exp", title:"TCSS Cluster 1: Low Skill-High Spend, By 10 Level"},
    {name:"Low Skill · Low Spend (C2)",   n:2020, pct:-2.6,  sr:118,  lr:-19,  driver:"exp", title:"TCSS Cluster 2: Low Skill-Low Spend, By 10 Level"},
  ];

  return (
    <div>
      <TabHeading title="Heterogeneity Analysis"/>
      <Section title="By Player Segment (k-means, 4 clusters)"/>
      {/* 2x2 event study grid */}
      <div style={{background:"#fff",border:"1px solid #e5e3de",borderRadius:8,padding:"12px",marginBottom:12}}>
        <img src="./tccs%20clusters.png" style={{width:"100%",borderRadius:4}} alt="TCSS cluster event studies"/>
      </div>
      {/* Summary cards */}
      {clusters.map(c=>{
        const isAcc=c.driver==="acc";
        const color=isAcc?"#b92d2d":"#2563b0";
        const bg=isAcc?"#fff0f0":"#eff5ff";
        return (
          <div key={c.name} style={{background:"#fff",border:"1px solid #e5e3de",borderRadius:8,padding:"10px 12px",marginBottom:8}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
              <div style={{fontSize:12,fontWeight:600}}>{c.name} (N={c.n.toLocaleString()})</div>
              <div style={{background:bg,color,fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:10}}>{c.pct}%</div>
            </div>
            <div style={{display:"flex",gap:6}}>
              {[
                {label:"Short-run (TP=0)",val:c.sr,color:c.sr>0?"#2563b0":"#b92d2d"},
                {label:"Long-run (TP=1–10)",val:c.lr,color:"#b92d2d"},
              ].map(({label,val,color:vc})=>(
                <div key={label} style={{flex:1,background:"#f8f7f4",borderRadius:4,padding:"5px 8px"}}>
                  <div style={{fontSize:10,color:"#999"}}>{label}</div>
                  <div style={{fontSize:13,fontWeight:700,color:vc}}>{val>0?"+":""}{val} coins</div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
      <Callout color="#2563b0" bg="#eff5ff">
        <b>Composition effect:</b> Low-skill players drive the short-run increase (expansion); high-skill players drive the long-run decline (acceleration + substitution).
      </Callout>
      <div style={{background:"#fff",border:"1px solid #e5e3de",borderRadius:8,padding:"14px",marginBottom:12}}>
        <ul style={{margin:"0 0 0 18px",padding:0,fontSize:13,color:"#444",lineHeight:1.7}}>
          <li><b>Low-skill</b> players drive the temporary increase.</li>
          <li><b>High-skill</b> players drive the persistent decline.</li>
        </ul>
      </div>

      <Section title="By Level Difficulty — U-Shaped Pattern"/>
      <div style={{background:"#fff",border:"1px solid #e5e3de",borderRadius:8,padding:"14px",marginBottom:12}}>
        <div style={{fontSize:11,fontWeight:600,textTransform:"uppercase",color:"#999",marginBottom:10}}>ATT on total coin spending by difficulty level</div>
        <img src="./att_by_diff.pdf.png" style={{width:"100%",borderRadius:4,display:"block"}} alt="ATT by difficulty"/>
      </div>
      <Callout color="#2d7a3a" bg="#f0faf2">
        Decline largest on <b>medium-difficulty levels (3–4): −15 to −16 coins</b>. On hard levels, expansion partially offsets. On easy levels, fewer failures reduce exposure.
      </Callout>
      <div style={{background:"#fff",border:"1px solid #e5e3de",borderRadius:8,padding:"14px"}}>
        <ul style={{margin:"0 0 0 18px",padding:0,fontSize:13,color:"#444",lineHeight:1.7}}>
          <li><b>U-shaped pattern:</b> Largest spending decline is observed on medium-difficulty levels.</li>
        </ul>
      </div>
    </div>
  );
}

export default function App() {
  const [tab,setTab]=useState(0);
  const sections = [
    { id: "overview", content: <Overview/> },
    { id: "policy-change", content: <Policy/> },
    { id: "main-result", content: <Results/> },
    { id: "mechanism", content: <Mechanism/> },
    { id: "heterogeneity-analysis", content: <Heterogeneity/> },
  ];

  function jumpToSection(id, index) {
    setTab(index);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  return (
    <div style={{maxWidth:820,margin:"0 auto",padding:"24px 16px 60px",fontFamily:"system-ui,sans-serif",background:"#f8f7f4",minHeight:"100vh"}}>
      <div style={{borderBottom:"1px solid #ddd",paddingBottom:14,marginBottom:18}}>
        <div style={{fontSize:10,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",color:"#999",marginBottom:4}}>Interactive Paper Companion · April 20, 2026</div>
        <h1 style={{fontFamily:"Georgia,serif",fontSize:22,margin:"0 0 3px",color:"#1a1a1a"}}>Oops! Out of Moves</h1>
        <div style={{fontFamily:"Georgia,serif",fontSize:14,fontStyle:"italic",color:"#555"}}>The Impact of Dynamic Post-Failure Offers on Monetization in Mobile Games</div>
        <div style={{fontSize:11,color:"#999",marginTop:4}}>Enfal Arısoy &amp; Övünç Yılmaz · Leeds School of Business, CU Boulder</div>
      </div>
      <div style={{display:"flex",gap:4,marginBottom:18,flexWrap:"wrap"}}>
        {TABS.map((t,i)=>(
          <button key={t.id} onClick={()=>jumpToSection(t.id, i)} style={{
            padding:"7px 14px",borderRadius:6,border:"1px solid "+(tab===i?"#1a1a1a":"#ccc"),
            fontSize:12,fontWeight:600,cursor:"pointer",
            background:tab===i?"#1a1a1a":"#fff",color:tab===i?"#fff":"#555",
          }}>{t.label}</button>
        ))}
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:28}}>
        {sections.map((section, idx)=>(
          <section key={section.id} id={section.id} style={{scrollMarginTop:24}}>
            {idx > 0 && <div style={{borderTop:"1px solid #ddd",marginBottom:18}} />}
            {section.content}
          </section>
        ))}
      </div>
    </div>
  );
}
