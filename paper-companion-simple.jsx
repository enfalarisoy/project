const { useState } = React;

const COLORS = {
  royalBlue: "rgb(220,220,255)",
  royalBlueDark: "rgb(120,120,190)",
  lightGray: "rgb(240,240,245)",
  ink: "#1d1d26",
  green: "#2f7d4f",
  greenBg: "#eef8f0",
  red: "#b04444",
  redBg: "#fff1f1",
  blue: "#315aa6",
  blueBg: "#eef4ff",
  gold: "#b07413",
  paper: "#fbfaf7",
  border: "#d8d8e2",
};

const TABS = [
  { label: "Motivation", id: "motivation" },
  { label: "Setting & Data", id: "setting-data" },
  { label: "Empirical Strategy", id: "empirical-strategy" },
  { label: "Main Results", id: "main-results" },
  { label: "Mechanism & Heterogeneity", id: "mechanism-heterogeneity" },
  { label: "Conclusion", id: "conclusion" },
];

function Panel({ children, style }) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid " + COLORS.border,
        borderRadius: 14,
        boxShadow: "0 8px 28px rgba(35,35,50,0.05)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function Slide({ title, children, kicker }) {
  return (
    <Panel style={{ padding: "18px 20px", marginBottom: 18 }}>
      {kicker && (
        <div
          style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#8d8da3",
            marginBottom: 6,
          }}
        >
          {kicker}
        </div>
      )}
      <h3
        style={{
          margin: 0,
          fontFamily: "Georgia, serif",
          fontSize: 28,
          color: COLORS.ink,
          lineHeight: 1.15,
        }}
      >
        {title}
      </h3>
      <div style={{ marginTop: 14 }}>{children}</div>
    </Panel>
  );
}

function TabHeading({ title, subtitle }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div
        style={{
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "#8d8da3",
          marginBottom: 6,
        }}
      >
        Section
      </div>
      <h2
        style={{
          margin: 0,
          fontFamily: "Georgia, serif",
          fontSize: 36,
          color: COLORS.ink,
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <div
          style={{
            marginTop: 6,
            fontSize: 14,
            color: "#66667d",
            maxWidth: 760,
            lineHeight: 1.6,
          }}
        >
          {subtitle}
        </div>
      )}
    </div>
  );
}

function BulletList({ items, compact }) {
  return (
    <ul
      style={{
        margin: 0,
        paddingLeft: 22,
        fontSize: compact ? 13 : 14,
        color: "#33354a",
        lineHeight: compact ? 1.65 : 1.8,
      }}
    >
      {items.map((item, index) => (
        <li key={index} style={{ marginBottom: compact ? 6 : 8 }}>
          <span dangerouslySetInnerHTML={{ __html: item }} />
        </li>
      ))}
    </ul>
  );
}

function Callout({ color, background, children }) {
  return (
    <div
      style={{
        background,
        border: "1px solid " + color + "33",
        borderLeft: "4px solid " + color,
        borderRadius: 12,
        padding: "12px 14px",
        fontSize: 14,
        lineHeight: 1.7,
        color: "#33354a",
      }}
    >
      {children}
    </div>
  );
}

function StatCard({ label, value, detail, color }) {
  return (
    <div
      style={{
        flex: 1,
        minWidth: 180,
        background: "#fff",
        border: "1px solid " + COLORS.border,
        borderRadius: 14,
        padding: "14px 16px",
      }}
    >
      <div
        style={{
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "#8d8da3",
          marginBottom: 6,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: "Georgia, serif",
          fontSize: 28,
          color,
          fontWeight: 700,
          lineHeight: 1.1,
        }}
      >
        {value}
      </div>
      {detail && (
        <div style={{ marginTop: 6, fontSize: 12, color: "#6b6b7a", lineHeight: 1.5 }}>
          {detail}
        </div>
      )}
    </div>
  );
}

function TwoColumn({ left, right, leftWidth = "1.25fr", rightWidth = "0.95fr", gap = 18 }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `${leftWidth} ${rightWidth}`,
        gap,
        alignItems: "start",
      }}
    >
      <div>{left}</div>
      <div>{right}</div>
    </div>
  );
}

function TableCell({ children, align = "left", strong, style, ...rest }) {
  return (
    <td
      style={{
        padding: "8px 8px",
        borderBottom: "1px solid #ececf3",
        textAlign: align,
        fontWeight: strong ? 700 : 400,
        fontSize: 12,
        ...style,
      }}
      {...rest}
    >
      {children}
    </td>
  );
}

function TableHeader({ children, align = "left", ...rest }) {
  return (
    <th
      style={{
        padding: "8px 8px",
        borderBottom: "1px solid #d5d5e2",
        textAlign: align,
        fontSize: 12,
        fontWeight: 700,
      }}
      {...rest}
    >
      {children}
    </th>
  );
}

function SettingFlowImages() {
  const figureStyle = {
    flex: "1 1 0",
    minWidth: 0,
    textAlign: "center",
  };

  const imageStyle = {
    width: "100%",
    height: 280,
    objectFit: "contain",
    display: "block",
  };

  const captionTitle = {
    fontSize: 10,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    color: "#8d8da3",
    marginTop: 10,
    marginBottom: 6,
    fontWeight: 700,
  };

  const captionText = {
    fontSize: 13,
    lineHeight: 1.55,
    color: COLORS.ink,
    fontWeight: 600,
  };

  return (
    <div style={{ display: "flex", gap: 16, alignItems: "stretch", flexWrap: "nowrap" }}>
      <div style={figureStyle}>
        <img src="./IMG_0355.jpg" alt="Match-3 level" style={imageStyle} />
        <div style={captionTitle}>Match-3 Level</div>
        <div style={captionText}>Clear obstacles within a move limit</div>
      </div>
      <div
        style={{
          fontSize: 34,
          color: COLORS.royalBlueDark,
          fontWeight: 700,
          flex: "0 0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        →
      </div>
      <div style={figureStyle}>
        <img src="./oom1.png" alt="Failure screen" style={imageStyle} />
        <div style={captionTitle}>Failure</div>
        <div style={captionText}>Player runs out of moves before finishing</div>
      </div>
      <div
        style={{
          fontSize: 34,
          color: COLORS.royalBlueDark,
          fontWeight: 700,
          flex: "0 0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        →
      </div>
      <div style={figureStyle}>
        <img src="./offer.png" alt="Bonus action offer" style={imageStyle} />
        <div style={captionTitle}>Bonus Action</div>
        <div style={captionText}>Offer appears: buy more moves with coins</div>
      </div>
    </div>
  );
}

function ResearchTradeoffDiagram() {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid " + COLORS.border,
        borderRadius: 16,
        padding: 18,
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 56px 240px 56px 1fr",
          gap: 10,
          alignItems: "center",
        }}
      >
        <div
          style={{
            background: COLORS.greenBg,
            border: "1px solid #9dccaa",
            borderRadius: 14,
            padding: "16px 18px",
            minHeight: 122,
          }}
        >
          <div style={{ textAlign: "center", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: COLORS.green, marginBottom: 10 }}>
            Expansion
          </div>
          <div style={{ fontSize: 14, lineHeight: 1.8, color: "#264430" }}>
            <div><b>Player:</b> Accept ↑</div>
            <div><b>Firm:</b> Revenue ↑</div>
          </div>
        </div>
        <div style={{ textAlign: "center", fontSize: 30, fontWeight: 700, color: COLORS.green }}>←</div>
        <div
          style={{
            background: "#fff",
            border: "1.5px solid #999ab7",
            borderRadius: 14,
            padding: "16px 18px",
            textAlign: "center",
            minHeight: 108,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div style={{ fontFamily: "Georgia, serif", fontSize: 20, fontWeight: 700, color: COLORS.ink }}>Dynamic</div>
          <div style={{ fontFamily: "Georgia, serif", fontSize: 20, fontWeight: 700, color: COLORS.ink }}>Post-Failure Offer</div>
          <div style={{ marginTop: 6, fontSize: 12, fontStyle: "italic", color: "#77788f" }}>(More moves per purchase)</div>
        </div>
        <div style={{ textAlign: "center", fontSize: 30, fontWeight: 700, color: COLORS.red }}>→</div>
        <div
          style={{
            background: COLORS.redBg,
            border: "1px solid #e2b0b0",
            borderRadius: 14,
            padding: "16px 18px",
            minHeight: 122,
          }}
        >
          <div style={{ textAlign: "center", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: COLORS.red, marginBottom: 10 }}>
            Acceleration
          </div>
          <div style={{ fontSize: 14, lineHeight: 1.8, color: "#4e2e2e" }}>
            <div><b>Player:</b> Progress Faster ↑</div>
            <div><b>Firm:</b> Revenue ↓</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PolicyTable() {
  const fixedRows = [
    ["1st", "900"],
    ["2nd", "1900"],
    ["3rd", "2700"],
    ["4th+", "3600"],
  ];
  const dynamicMoves = ["5", "5", "10", "15", "20", "25", "30", "35"];

  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", minWidth: 760, borderCollapse: "collapse", fontSize: 12 }}>
        <thead>
          <tr>
            <TableHeader></TableHeader>
            <TableHeader>Price</TableHeader>
            {["1", "2", "3", "4", "5", "6", "7", "8+"].map((n) => (
              <TableHeader key={n} align="center">{n}</TableHeader>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <TableCell strong colSpan="10" style={{ fontStyle: "italic", color: "#555", background: "#faf9fe" }}>
              Fixed policy (pre-Aug 10): all offers = 5 moves
            </TableCell>
          </tr>
          {fixedRows.map(([label, price]) => (
            <tr key={label}>
              <TableCell strong>{label}</TableCell>
              <TableCell>{price}</TableCell>
              {Array.from({ length: 8 }).map((_, index) => (
                <TableCell key={index} align="center">5</TableCell>
              ))}
            </tr>
          ))}
          <tr>
            <TableCell strong colSpan="10" style={{ fontStyle: "italic", color: "#555", background: "#faf9fe" }}>
              Dynamic policy (post-Aug 10): offers grow with attempts
            </TableCell>
          </tr>
          {fixedRows.map(([label, price]) => (
            <tr key={"dynamic-" + label}>
              <TableCell strong>{label}</TableCell>
              <TableCell>{price}</TableCell>
              {dynamicMoves.map((value, index) => (
                <TableCell
                  key={index}
                  align="center"
                  strong={index >= 2}
                  style={{ color: index >= 2 ? COLORS.gold : COLORS.ink }}
                >
                  {value}
                </TableCell>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ExposureDiagram({ title, mode }) {
  const width = 420;
  const height = 220;
  const x0 = 42;
  const x1 = 380;
  const yRows = [60, 98, 136, 174];
  const labels = ["A", "B", "C", "D"];
  const switchPoints = mode === "calendar" ? [210, 210, 210, 210] : [110, 175, 240, null];
  const startLabel = mode === "calendar" ? "Mar" : "200";
  const midLabel = mode === "calendar" ? "Aug 10" : "300";
  const endLabel = mode === "calendar" ? "Dec" : "550";
  const midX = mode === "calendar" ? 210 : 215;

  return (
    <Panel style={{ padding: "14px 14px 10px" }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.ink, marginBottom: 6, textAlign: "center" }}>{title}</div>
      <svg viewBox={`0 0 ${width} ${height}`} style={{ width: "100%", display: "block" }}>
        <defs>
          <marker id={"arrow-" + mode} markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="#444" />
          </marker>
        </defs>
        <line x1={x0} y1="26" x2={x1} y2="26" stroke="#444" strokeWidth="2" markerEnd={`url(#arrow-${mode})`} />
        <text x={(x0 + x1) / 2} y="16" textAnchor="middle" fontSize="12" fill="#333">
          {mode === "calendar" ? "Calendar time" : "Level progression"}
        </text>
        <text x={x0} y="42" textAnchor="middle" fontSize="10" fill="#666">{startLabel}</text>
        <text x={midX} y="42" textAnchor="middle" fontSize="10" fill="#666">{midLabel}</text>
        <text x={x1} y="42" textAnchor="middle" fontSize="10" fill="#666">{endLabel}</text>
        {yRows.map((y, idx) => {
          const sx = switchPoints[idx];
          return (
            <g key={labels[idx]}>
              <text x="18" y={y + 4} fontSize="12" fontWeight="700" fill="#333">{labels[idx]}</text>
              <line x1={x0} y1={y} x2={sx || x1} y2={y} stroke={COLORS.green} strokeWidth="6" strokeLinecap="round" />
              {sx && <line x1={sx} y1={y} x2={x1} y2={y} stroke={COLORS.blue} strokeWidth="6" strokeLinecap="round" />}
              {sx && <circle cx={sx} cy={y} r="4" fill="#111" />}
              {mode === "level" && sx && idx < 3 && (
                <text x={sx} y={y - 10} textAnchor="middle" fontSize="10" fill="#333">
                  <tspan fontStyle="italic">G</tspan>
                  <tspan dy="3" fontSize="8">{labels[idx]}</tspan>
                </text>
              )}
              {mode === "calendar" && idx === 0 && sx && (
                <text x={sx} y={y - 10} textAnchor="middle" fontSize="10" fill="#333">Policy change</text>
              )}
            </g>
          );
        })}
        <text x="100" y="205" fontSize="11" fill={COLORS.green}>Pre-treatment</text>
        <text x="275" y="205" fontSize="11" fill={COLORS.blue}>Post-treatment</text>
      </svg>
    </Panel>
  );
}

function ResultsTable() {
  const rows = [
    ["ATT", "-81.43***", "-70.92***", "-58.71***"],
    ["", "(17.39)", "(15.62)", "(13.74)"],
    ["Pre mean", "635.2", "635.2", "635.2"],
    ["Obs.", "247,962", "354,970", "247,962"],
  ];

  return (
    <Panel style={{ padding: "14px 16px" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
        <thead>
          <tr>
            <TableHeader></TableHeader>
            <TableHeader align="center">CS<br />NYT</TableHeader>
            <TableHeader align="center">CS<br />Never-T</TableHeader>
            <TableHeader align="center">ETWFE<br />NYT</TableHeader>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <TableCell key={cellIndex} align={cellIndex === 0 ? "left" : "center"} strong={rowIndex === 0 && cellIndex > 0}>
                  {cell}
                </TableCell>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Panel>
  );
}

function PaceTable() {
  const rows = [
    ["ATT", "-1.90***", "0.11", "-0.98***"],
    ["", "(0.29)", "(0.27)", "(0.24)"],
    ["Pre-treatment mean", "28.39", "28.39", "28.39"],
  ];

  return (
    <Panel style={{ padding: "14px 16px" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
        <thead>
          <tr>
            <TableHeader></TableHeader>
            <TableHeader align="center">CS NYT</TableHeader>
            <TableHeader align="center">CS Matched</TableHeader>
            <TableHeader align="center">ETWFE NYT</TableHeader>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <TableCell key={cellIndex} align={cellIndex === 0 ? "left" : "center"} strong={rowIndex === 0 && cellIndex > 0}>
                  {cell}
                </TableCell>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Panel>
  );
}

function Motivation() {
  return (
    <div>
      <TabHeading
        title="Motivation"
        subtitle="Why mobile game studios shifted from ads toward dynamic post-failure offers, and the key research trade-off behind that design."
      />

      <Slide title="Video Game Industry">
        <BulletList
          items={[
            "Video games are one of the fastest-growing segments of the entertainment industry.",
            "Expected to generate roughly <b>$400B</b> in revenue by 2027 (Deloitte, 2024).",
            "Growth is driven by expansion across platforms: console, PC, and especially <b>mobile</b>.",
          ]}
        />
        <img
          src="./rpimagep1.png"
          alt="Video game industry"
          style={{ width: "100%", marginTop: 16, borderRadius: 10, display: "block" }}
        />
      </Slide>

      <Slide title="Mobile Game Monetization: From Ads to In-Game Purchases">
        <TwoColumn
          left={
            <BulletList
              compact
              items={[
                'Mobile games are typically <b>free to download</b> and monetize via ads or in-game purchases.',
                '<b>Ads:</b> AdMob, Apple Ads, and other embedded ad networks.',
                '<b>In-game purchases:</b> extra lives, extra moves, boosters, and other microtransactions.',
                'Ads create friction that harms gameplay (Deloitte, 2025).',
                'About <b>3-6%</b> of users quit on their first ad encounter; disruptive ad formats push quit rates to <b>9-11%</b>.',
                'The industry is shifting toward <b>ad-free, microtransaction-driven</b> models.',
                'Recent ad-free hits include <i>Monopoly Go!</i>, <i>Royal Kingdom</i>, and <i>Royal Match</i>.',
                '<i>Candy Crush</i> announced in <b>January 2026</b> that it is testing ad removal.',
              ]}
            />
          }
          right={
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <img src="./comment.png" alt="Player reaction to ads" style={{ width: "100%", borderRadius: 12, display: "block" }} />
              <Panel style={{ padding: "14px 16px", background: COLORS.blueBg }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: COLORS.blue, marginBottom: 6 }}>
                  Industry Transition
                </div>
                <div style={{ fontSize: 14, lineHeight: 1.7, color: "#34415f" }}>
                  Studios increasingly replace ad-heavy monetization with cleaner purchase-based experiences.
                </div>
              </Panel>
            </div>
          }
        />
      </Slide>

      <Slide title="Key Monetization Tool: Post-Failure Bonus Actions">
        <BulletList
          items={[
            "Bonus actions are extra moves or lives offered for in-game currency after failure.",
            "They allow players to continue from the point of failure instead of restarting the level.",
          ]}
        />
      </Slide>

      <Slide title="Industry Shift: Fixed to Dynamic Post-Failure Offers">
        <BulletList
          compact
          items={[
            "Starting in <b>2023</b>, leading casual games shifted from <b>fixed</b> to <b>dynamic</b> post-failure offers.",
            "Fixed policy: constant bonus offer (<b>+5 moves</b>) regardless of the number of failures.",
            "Dynamic policy: offer size <b>increases</b> with repeated failures while <b>prices stay the same</b>.",
          ]}
        />
        <img src="./offsm.png" alt="Fixed to dynamic offer sizes" style={{ width: "100%", marginTop: 16, borderRadius: 10, display: "block" }} />
      </Slide>

      <Slide title="Industry Shift: Fixed to Dynamic Post-Failure Offers">
        <BulletList
          compact
          items={[
            "The change delivers <b>more value for the same price</b> at later failures within an attempt.",
            "That can improve take-up in the short run, but it may also reduce later spending if players substitute away from repeated costly purchases.",
          ]}
        />
        <img src="./graph1.png" alt="Dynamic offer schedule" style={{ width: "100%", marginTop: 16, borderRadius: 10, display: "block" }} />
      </Slide>

      <Slide title="Research Question & Trade-off">
        <div
          style={{
            fontFamily: "Georgia, serif",
            fontSize: 28,
            lineHeight: 1.35,
            textAlign: "center",
            maxWidth: 900,
            margin: "0 auto 18px",
            color: COLORS.ink,
          }}
        >
          How does switching from a fixed to a dynamic post-failure offer policy affect players' intertemporal spending?
        </div>
        <ResearchTradeoffDiagram />
      </Slide>

      <Slide title="Related Literature">
        <div style={{ display: "grid", gap: 14 }}>
          <Callout color={COLORS.blue} background={COLORS.blueBg}>
            <b>Player engagement &amp; game design:</b>
            <ul style={{ margin: "8px 0 0", paddingLeft: 18 }}>
              <li>Engagement optimization (Huang et al. 2019; Deng et al. 2024; Zhao et al. 2022)</li>
              <li>Dynamic difficulty adjustment (Ascarza et al. 2024)</li>
            </ul>
          </Callout>
          <Callout color={COLORS.green} background={COLORS.greenBg}>
            <b>Monetization strategies:</b>
            <ul style={{ margin: "8px 0 0", paddingLeft: 18 }}>
              <li>Quantity discounts (Levitt et al. 2016)</li>
              <li>Price promotions (Runge et al. 2022)</li>
              <li>Loot boxes (Chen et al. 2021; Miao et al. 2025; Amano et al. 2024)</li>
              <li>Bonus actions — timing dimension only (Sheng et al. 2025)</li>
            </ul>
          </Callout>
          <Callout color={COLORS.red} background={COLORS.redBg}>
            <b>Our contribution:</b> the first empirical study of bonus action design as a monetization mechanism, documenting systematic shifts in <b>intertemporal spending</b>.
          </Callout>
        </div>
      </Slide>
    </div>
  );
}

function SettingData() {
  return (
    <div>
      <TabHeading
        title="Setting & Data"
        subtitle="Partner context, the policy change itself, and the player-level play-by-play dataset used for identification."
      />

      <Slide title="Game Setting">
        <TwoColumn
          left={
            <BulletList
              compact
              items={[
                "Partner: a leading mobile game company in Turkey.",
                "Game: a casual puzzle title with <b>2M+</b> active players and <b>5M+</b> downloads.",
                "Match-3 structure: players clear obstacles within a move limit to complete a level.",
                "Progression is <b>linear</b>: levels are completed in a fixed sequence.",
                "Upon failure, players may receive <b>post-failure offers</b>: extra moves in exchange for coins.",
              ]}
            />
          }
          right={<SettingFlowImages />}
        />
      </Slide>

      <Slide title="Policy Change: Fixed to Dynamic Post-Failure Offers">
        <BulletList
          compact
          items={[
            "Within an attempt, prices <b>increase</b> with repeated failures: 900 → 1,900 → 2,700 → 3,600 coins.",
            "On <b>August 10, 2024</b>, the company switched to a <b>dynamic</b> offer policy.",
            "Prices are unchanged; only <b>offer size</b> grows after repeated failures.",
          ]}
        />
        <div style={{ marginTop: 14 }}>
          <PolicyTable />
        </div>
      </Slide>

      <Slide title="Data">
        <TwoColumn
          left={
            <BulletList
              items={[
                "<b>Play-by-play data</b> from <b>March 16, 2024</b> through <b>December 31, 2024</b>.",
                "Observed fields include player ID, level, attempt order, outcome, and coins spent.",
                'Sample focuses on "<b>hardcore players</b>" observed between levels <b>200-548</b>.',
                "Levels 1-200 are a warm-up stage; levels above 548 add little new gameplay variation.",
              ]}
            />
          }
          right={
            <div style={{ display: "grid", gap: 12 }}>
              <StatCard label="Treated players" value="7,431" detail="Dynamic offer exposure begins at different levels." color={COLORS.blue} />
              <StatCard label="Controls" value="100,000+" detail="Large pool of not-yet-treated and never-treated players." color={COLORS.green} />
              <StatCard label="Observations" value="3.5M+" detail="31% of players account for 54% of coin spending." color={COLORS.red} />
            </div>
          }
        />
      </Slide>
    </div>
  );
}

function EmpiricalStrategy() {
  return (
    <div>
      <TabHeading
        title="Empirical Strategy"
        subtitle="Treatment timing is defined by level progression, creating staggered exposure across players even though the policy changed for everyone at once."
      />

      <Slide title="Identification: Staggered Exposure Across Levels">
        <BulletList
          compact
          items={[
            "The policy change is simultaneous for all players on <b>August 10, 2024</b>.",
            "Players are at <b>different levels</b> at the moment of the change.",
            "All players follow the same <b>linear progression</b> path.",
            "This creates <b>staggered exposure</b> to the dynamic policy across levels.",
            'Time dimension: <b>level progression</b>, where treatment timing is <b>G<sub>i</sub></b>, the first level at which a player sees a dynamic offer.',
          ]}
        />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginTop: 16 }}>
          <ExposureDiagram title="Calendar-time view" mode="calendar" />
          <ExposureDiagram title="Level-progression view" mode="level" />
        </div>
      </Slide>

      <Slide title="The Problem with TWFE in Staggered Adoption">
        <BulletList
          items={[
            "In staggered adoption settings, standard TWFE can be problematic when treatment effects vary across cohorts or event time.",
            "It can assign <b>negative weights</b> to some comparisons (de Chaisemartin &amp; D'Haultfœuille 2020).",
            "It can use <b>already-treated units</b> as controls for later-treated units, creating forbidden comparisons (Goodman-Bacon 2021).",
            "Event-study TWFE can also generate <b>contaminated dynamic estimates</b> (Sun &amp; Abraham 2021).",
          ]}
        />
      </Slide>
    </div>
  );
}

function MainResults() {
  return (
    <div>
      <TabHeading
        title="Main Results"
        subtitle="The clean staggered-adoption design reveals a short-run spike followed by a persistent long-run decline in total coin spending."
      />

      <Slide title="Main Result: Callaway & Sant'Anna (2021) Estimator">
        <BulletList
          compact
          items={[
            "Group-time ATT compares treated players to <b>not-yet-treated</b> players using clean 2x2 comparisons:",
          ]}
        />
        <Panel style={{ padding: "14px 16px", background: "#fafafe", marginTop: 12 }}>
          <div
            style={{
              fontFamily: "Times New Roman, Georgia, serif",
              fontSize: 24,
              color: COLORS.ink,
              textAlign: "center",
              lineHeight: 1.45,
              overflowX: "auto",
              whiteSpace: "nowrap",
            }}
          >
            ATT(g,t) = E[Y<sub>it</sub> - Y<sub>i,g-1</sub> | G<sub>i</sub> = g] - E[Y<sub>it</sub> - Y<sub>i,g-1</sub> | G<sub>i</sub> &gt; t]
          </div>
        </Panel>
        <div style={{ fontSize: 13, color: "#57576b", marginTop: 10 }}>
          Levels are grouped into 10-level bins (35 bins: 200-209, 210-219, ...).
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1.15fr 0.85fr", gap: 14, marginTop: 16 }}>
          <Panel style={{ padding: 12 }}>
            <img
              src="./total_coin_spending_post_failure_offers.png"
              alt="Total coin spending"
              style={{ width: "100%", display: "block", borderRadius: 10 }}
            />
          </Panel>
          <div style={{ display: "grid", gap: 12 }}>
            <ResultsTable />
            <Callout color={COLORS.blue} background={COLORS.blueBg}>
              <BulletList
                compact
                items={[
                  "<b>About 13%</b> net decline in total coin spending.",
                  "Treatment bin: temporary <b>12%</b> increase.",
                  "Subsequent bins: persistent <b>15%</b> decline.",
                  "<b>Implication:</b> short-horizon A/B tests overstate performance.",
                  "Long-run decline dominates short-run increase.",
                  "Results are consistent across specifications.",
                ]}
              />
            </Callout>
          </div>
        </div>
      </Slide>
    </div>
  );
}

function MechanismHeterogeneity() {
  return (
    <div>
      <TabHeading
        title="Mechanism & Heterogeneity"
        subtitle="The spending decline comes from within-attempt substitution, strategic waiting, and heterogeneous responses across player types and level difficulty."
      />

      <Slide title="Decomposition of Total Coin Spending on Post-failure Offers">
        <Callout color={COLORS.blue} background={COLORS.blueBg}>
          Reminder: 1st offer = 900 coins; 2nd+ offers = 1,900-3,600 coins (2-4x higher).
        </Callout>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 14 }}>
          <Panel style={{ padding: 12 }}>
            <img src="./TCS1_Not_Yet_Treated_HQ.png" alt="Coin spending on first offer" style={{ width: "100%", display: "block", borderRadius: 10 }} />
            <div style={{ marginTop: 8, fontSize: 12, color: "#66667d", textAlign: "center" }}>(a) Coin Spending on 1st Offer</div>
          </Panel>
          <Panel style={{ padding: 12 }}>
            <img src="./TCSGE2_Not_Yet_Treated_HQ.png" alt="Coin spending on subsequent offers" style={{ width: "100%", display: "block", borderRadius: 10 }} />
            <div style={{ marginTop: 8, fontSize: 12, color: "#66667d", textAlign: "center" }}>(b) Coin Spending on Subsequent Offers</div>
          </Panel>
        </div>
        <div style={{ marginTop: 14 }}>
          <BulletList
            items={[
              "1st offer: short-run increase, no long-run effect (<b>-23 coins</b>, not significant).",
              "2nd+ offers: large and persistent decline (<b>-58*** coins</b>, <b>-62%</b>).",
              "Reduced spending is driven by the <b>decline in costly repeat continues</b>.",
            ]}
          />
        </div>
      </Slide>

      <Slide title="Delaying the First-Accept Offer">
        <img
          src="./strg_wait.pdf.png"
          alt="Strategic waiting"
          style={{ width: "100%", display: "block", borderRadius: 10 }}
        />
        <div style={{ marginTop: 14 }}>
          <BulletList
            items={[
              "Players delay first acceptance toward later, larger offers.",
              "<b>9 p.p.</b> drop at attempt 1; acceptance rises from attempt 3 onward.",
              "Consistent with <b>strategic waiting</b>.",
            ]}
          />
        </div>
      </Slide>

      <Slide title="Level Progression Pace">
        <PaceTable />
        <div style={{ marginTop: 14 }}>
          <BulletList
            items={[
              "While strategic delay could slow progression, the estimates are consistent with <b>faster completion</b>.",
              "A likely reason is that larger offers provide more moves and raise success probability.",
            ]}
          />
        </div>
      </Slide>

      <Slide title="Heterogeneity Results">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: COLORS.ink, marginBottom: 8, textAlign: "center" }}>Heterogeneity by Player Type</div>
            <Panel style={{ padding: 10 }}>
              <img src="./heterogeneity_player_type_symmetric.png" alt="Heterogeneity by player type" style={{ width: "100%", display: "block", borderRadius: 10 }} />
            </Panel>
            <div style={{ marginTop: 10 }}>
              <BulletList
                compact
                items={[
                  "<b>Low-skill</b> players drive the temporary increase.",
                  "<b>High-skill</b> players drive the persistent decline.",
                ]}
              />
            </div>
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: COLORS.ink, marginBottom: 8, textAlign: "center" }}>Heterogeneity by Difficulty</div>
            <Panel style={{ padding: 10 }}>
              <img src="./heterogeneity_difficulty_symmetric.png" alt="Heterogeneity by difficulty" style={{ width: "100%", display: "block", borderRadius: 10 }} />
            </Panel>
            <div style={{ marginTop: 10 }}>
              <BulletList
                compact
                items={[
                  "<b>U-shaped pattern:</b> largest spending decline is observed on medium-difficulty levels.",
                ]}
              />
            </div>
          </div>
        </div>
      </Slide>
    </div>
  );
}

function Conclusion() {
  return (
    <div>
      <TabHeading
        title="Conclusion"
        subtitle="The long-run response to dynamic post-failure offers looks very different from the short-run signal that a standard A/B test would deliver."
      />

      <Slide title="Review of Results">
        <ol style={{ margin: 0, paddingLeft: 22, fontSize: 14, lineHeight: 1.8, color: "#33354a" }}>
          <li style={{ marginBottom: 8 }}>
            Dynamic post-failure offers <b>reduce overall spending by about 13%</b>, despite a temporary <b>12%</b> increase immediately after treatment.
          </li>
          <li style={{ marginBottom: 8 }}>
            The short-run increase is tied to a sharp reduction in <b>higher-cost subsequent offers</b>.
          </li>
          <li style={{ marginBottom: 8 }}>
            Players <b>strategically delay</b> purchases to later attempts where larger bundles are offered at the same price.
          </li>
          <li>
            The temporary increase is driven by <b>low-skill</b> players, while the persistent decline is driven by <b>high-skill</b> players.
          </li>
        </ol>
      </Slide>

      <Slide title="Managerial Implications">
        <ol style={{ margin: 0, paddingLeft: 22, fontSize: 14, lineHeight: 1.8, color: "#33354a" }}>
          <li style={{ marginBottom: 10 }}>
            <b>"Helping more" can reduce monetization.</b> Larger post-failure offers decrease spending among hardcore players.
          </li>
          <li style={{ marginBottom: 10 }}>
            <b>Short-run A/B tests do not equal long-run truth.</b> Standard tests miss intertemporal substitution in microtransaction environments.
          </li>
          <li>
            <b>Personalization matters.</b> Dynamic offers should be used selectively for low-skill players and conditioned on context and difficulty.
          </li>
        </ol>
      </Slide>

      <Panel style={{ padding: "38px 20px 34px", marginBottom: 18 }}>
        <div
          style={{
            textAlign: "center",
            fontFamily: "Georgia, serif",
            fontSize: 42,
            color: COLORS.ink,
          }}
        >
          Thank you!
        </div>
        <div style={{ textAlign: "center", fontSize: 18, color: "#5b5c72", marginTop: 12 }}>
          enfal.arisoy@colorado.edu
        </div>
      </Panel>
    </div>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState(0);

  const sections = [
    { id: "motivation", content: <Motivation /> },
    { id: "setting-data", content: <SettingData /> },
    { id: "empirical-strategy", content: <EmpiricalStrategy /> },
    { id: "main-results", content: <MainResults /> },
    { id: "mechanism-heterogeneity", content: <MechanismHeterogeneity /> },
    { id: "conclusion", content: <Conclusion /> },
  ];

  function jumpToSection(id, index) {
    setActiveTab(index);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #f5f5fb 0%, " + COLORS.paper + " 180px)",
        color: COLORS.ink,
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div style={{ maxWidth: 1140, margin: "0 auto", padding: "28px 20px 64px" }}>
        <Panel
          style={{
            padding: "22px 24px",
            marginBottom: 18,
            background: "linear-gradient(135deg, #ffffff 0%, #f4f4ff 100%)",
            borderColor: "#d3d4ee",
          }}
        >
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: COLORS.royalBlueDark, marginBottom: 8 }}>
            Interactive Paper Companion
          </div>
          <h1 style={{ margin: 0, fontFamily: "Georgia, serif", fontSize: 44, lineHeight: 1.08, color: COLORS.ink }}>
            Oops! Out of Moves:
          </h1>
          <div style={{ marginTop: 8, fontFamily: "Georgia, serif", fontSize: 26, fontStyle: "italic", color: "#5d5e77", lineHeight: 1.35 }}>
            The Impact of Dynamic Post-Failure Offers on Monetization in Mobile Games
          </div>
          <div style={{ marginTop: 12, fontSize: 14, color: "#71728b" }}>
            Enfal Arısoy &amp; Övünç Yılmaz · Leeds School of Business
          </div>
        </Panel>

        <div
          style={{
            position: "sticky",
            top: 0,
            zIndex: 10,
            padding: "12px 0 16px",
            background: "linear-gradient(180deg, rgba(251,250,247,0.96) 0%, rgba(251,250,247,0.88) 78%, rgba(251,250,247,0) 100%)",
            backdropFilter: "blur(10px)",
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
              padding: 10,
              borderRadius: 16,
              background: "#ffffffd9",
              border: "1px solid #d8d8e2",
              boxShadow: "0 8px 24px rgba(20,20,30,0.06)",
            }}
          >
            {TABS.map((tab, index) => (
              <button
                key={tab.id}
                onClick={() => jumpToSection(tab.id, index)}
                style={{
                  border: "1px solid " + (activeTab === index ? COLORS.royalBlueDark : "#d3d3df"),
                  background: activeTab === index ? COLORS.royalBlue : "#fff",
                  color: COLORS.ink,
                  borderRadius: 999,
                  padding: "10px 14px",
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          {sections.map((section) => (
            <section key={section.id} id={section.id} style={{ scrollMarginTop: 92 }}>
              {section.content}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

if (document.getElementById("root")) {
  ReactDOM.createRoot(document.getElementById("root")).render(<App />);
}
