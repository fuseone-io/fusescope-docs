#!/usr/bin/env python3
"""Generates src/assets/collector/topology.svg, the isometric topology of the FuseScope Collector.

Run: python3 scripts/collector-topology.py. No dependencies.
"""
import math
import os

W, H = 1600, 1120
S = 54  # grid unit in px
CX, CY = 700, 270  # where grid (0, 0, 0) lands
C30, S30 = math.cos(math.pi / 6), math.sin(math.pi / 6)

CYAN, CYAN_SOFT = "#22d3ee", "#0e7490"
VIOLET = "#a78bfa"
BG0, BG1 = "#070d1f", "#0f1d3d"
TEXT, MUTED = "#e2e8f0", "#94a3b8"


def iso(x, y, z=0.0):
    return (CX + (x - y) * C30 * S, CY + (x + y) * S30 * S - z * S)


def pts(*p):
    return " ".join(f"{a:.1f},{b:.1f}" for a, b in p)


out = []


def add(s):
    out.append(s)


def prism(x, y, w, d, h, top, left, right, z=0.0, stroke=None, glow=False):
    """A box on the ground plane: x..x+w, y..y+d, z..z+h."""
    t = [iso(x, y, z + h), iso(x + w, y, z + h), iso(x + w, y + d, z + h), iso(x, y + d, z + h)]
    l = [iso(x, y + d, z + h), iso(x + w, y + d, z + h), iso(x + w, y + d, z), iso(x, y + d, z)]
    r = [iso(x + w, y, z + h), iso(x + w, y + d, z + h), iso(x + w, y + d, z), iso(x + w, y, z)]
    st = f' stroke="{stroke}" stroke-width="1.2"' if stroke else ""
    f = ' filter="url(#glow)"' if glow else ""
    add(f'<polygon points="{pts(*l)}" fill="{left}"{st}/>')
    add(f'<polygon points="{pts(*r)}" fill="{right}"{st}/>')
    add(f'<polygon points="{pts(*t)}" fill="{top}"{st}{f}/>')


def plate(x, y, w, d, h, label=None, label_at=None):
    prism(x, y, w, d, h, "#14254d", "#0b1733", "#0d1c3f", stroke="#1e3a6e")
    # grid on top
    for i in range(1, int(w)):
        a, b = iso(x + i, y, h), iso(x + i, y + d, h)
        add(f'<line x1="{a[0]:.1f}" y1="{a[1]:.1f}" x2="{b[0]:.1f}" y2="{b[1]:.1f}" stroke="#1d3768" stroke-width="0.7"/>')
    for j in range(1, int(d)):
        a, b = iso(x, y + j, h), iso(x + w, y + j, h)
        add(f'<line x1="{a[0]:.1f}" y1="{a[1]:.1f}" x2="{b[0]:.1f}" y2="{b[1]:.1f}" stroke="#1d3768" stroke-width="0.7"/>')
    if label:
        lx, ly = label_at
        add(f'<text x="{lx:.1f}" y="{ly:.1f}" class="plate">{label}</text>')


def cylinder(x, y, r, levels, z0=0.0, step=0.55):
    cx, cy = iso(x, y, z0)
    rx, ry = r * S * 1.05, r * S * 0.6
    for i in range(levels):
        zt = z0 + (i + 1) * step
        _, top_y = iso(x, y, zt)
        _, bot_y = iso(x, y, z0 + i * step)
        add(f'<path d="M{cx-rx:.1f},{bot_y:.1f} L{cx-rx:.1f},{top_y:.1f} A{rx:.1f},{ry:.1f} 0 0 0 {cx+rx:.1f},{top_y:.1f} '
            f'L{cx+rx:.1f},{bot_y:.1f} A{rx:.1f},{ry:.1f} 0 0 1 {cx-rx:.1f},{bot_y:.1f} Z" fill="url(#chSide)" stroke="#1e3a6e"/>')
        add(f'<ellipse cx="{cx:.1f}" cy="{top_y:.1f}" rx="{rx:.1f}" ry="{ry:.1f}" fill="#16325f" stroke="{CYAN}" stroke-width="1.4" filter="url(#glow)"/>')
        add(f'<ellipse cx="{cx:.1f}" cy="{top_y:.1f}" rx="{rx*0.55:.1f}" ry="{ry*0.55:.1f}" fill="none" stroke="#2b5c9e" stroke-width="1"/>')


def flow(path, color=CYAN, width=3.2, dashed=False, arrow=True, z=0.35):
    p = [iso(x, y, z) for x, y in path]
    d = "M" + " L".join(f"{a:.1f},{b:.1f}" for a, b in p)
    dash = ' stroke-dasharray="8 7"' if dashed else ""
    m = ' marker-end="url(#arrowV)"' if (arrow and color == VIOLET) else (' marker-end="url(#arrowC)"' if arrow else "")
    add(f'<path d="{d}" fill="none" stroke="{color}" stroke-opacity="0.25" stroke-width="{width*3.2:.1f}" stroke-linecap="round" stroke-linejoin="round"/>')
    add(f'<path d="{d}" fill="none" stroke="{color}" stroke-width="{width}" stroke-linecap="round" stroke-linejoin="round"{dash}{m} filter="url(#glow)"/>')
    if not dashed:
        add(f'<path d="{d}" fill="none" stroke="#ecfeff" stroke-width="{width*0.35:.1f}" stroke-linecap="round" class="pulse"/>')


def label(x, y, lines, anchor="middle", color=TEXT, sub=MUTED, box=True, size=15):
    lh = size + 5
    width = max(len(s) for s in lines) * size * 0.56 + 22
    height = lh * len(lines) + 12
    bx = x - width / 2 if anchor == "middle" else (x if anchor == "start" else x - width)
    if box:
        add(f'<rect x="{bx:.1f}" y="{y-size-6:.1f}" width="{width:.1f}" height="{height:.1f}" rx="7" fill="#0a1430" fill-opacity="0.86" stroke="#24467f"/>')
    tx = bx + width / 2
    for i, s in enumerate(lines):
        c, fw, fs = (color, 700, size) if i == 0 else (sub, 500, size - 2)
        add(f'<text x="{tx:.1f}" y="{y + i*lh:.1f}" text-anchor="middle" fill="{c}" font-weight="{fw}" font-size="{fs}">{s}</text>')


def callout(anchor, at, lines, **kw):
    """A label at screen point `at`, with a leader line to the screen point `anchor`."""
    add(f'<line x1="{anchor[0]:.1f}" y1="{anchor[1]:.1f}" x2="{at[0]:.1f}" y2="{at[1]-6:.1f}" stroke="#3b5b94" stroke-width="1.2"/>')
    add(f'<circle cx="{anchor[0]:.1f}" cy="{anchor[1]:.1f}" r="3.5" fill="#7dd3fc"/>')
    label(at[0], at[1], lines, **kw)


def pod(x, y):
    prism(x, y, 0.9, 0.9, 0.7, "#8b5cf6", "#5b21b6", "#6d28d9", stroke="#c4b5fd")
    a = iso(x + 0.45, y + 0.45, 0.7)
    add(f'<circle cx="{a[0]:.1f}" cy="{a[1]:.1f}" r="4" fill="#ede9fe"/>')


def agent(x, y):
    prism(x, y, 1.4, 1.4, 0.9, "#0891b2", "#0b4f6c", "#0e6b8c", stroke=CYAN, glow=True)
    a = iso(x + 0.7, y + 0.7, 0.9)
    add(f'<polygon points="{pts((a[0], a[1]-8), (a[0]+12, a[1]), (a[0], a[1]+8), (a[0]-12, a[1]))}" fill="#a5f3fc"/>')


def gateway(x, y):
    for i in range(5):
        top = "#1d4ed8" if i % 2 else "#1e40af"
        prism(x, y, 2.4, 2.4, 0.55, top, "#0b2463", "#11307f", z=i * 0.62, stroke="#60a5fa")
        a, b = iso(x + 0.3, y + 2.4, i * 0.62 + 0.28), iso(x + 2.1, y + 2.4, i * 0.62 + 0.28)
        add(f'<line x1="{a[0]:.1f}" y1="{a[1]:.1f}" x2="{b[0]:.1f}" y2="{b[1]:.1f}" stroke="{CYAN}" stroke-width="2" filter="url(#glow)"/>')
    prism(x + 0.5, y + 0.5, 1.4, 1.4, 0.35, "#38bdf8", "#0c4a6e", "#075985", z=5 * 0.62, stroke=CYAN, glow=True)


def backend(x, y):
    prism(x, y, 2.6, 1.6, 0.8, "#312e81", "#1e1b4b", "#27236b", stroke=VIOLET)
    # a screen standing on it
    p = [iso(x + 0.4, y + 0.3, 0.8), iso(x + 2.2, y + 0.3, 0.8), iso(x + 2.2, y + 0.3, 2.2), iso(x + 0.4, y + 0.3, 2.2)]
    add(f'<polygon points="{pts(*p)}" fill="#0b1433" stroke="{VIOLET}" stroke-width="1.5" filter="url(#glow)"/>')
    for k, (h, c) in enumerate([(0.5, CYAN), (0.9, VIOLET), (0.65, "#38bdf8"), (1.1, CYAN)]):
        bx = x + 0.7 + k * 0.38
        a, b = iso(bx, y + 0.3, 1.0), iso(bx, y + 0.3, 1.0 + h)
        add(f'<line x1="{a[0]:.1f}" y1="{a[1]:.1f}" x2="{b[0]:.1f}" y2="{b[1]:.1f}" stroke="{c}" stroke-width="7"/>')


def shield(x, y):
    prism(x, y, 1.3, 1.3, 0.5, "#0f766e", "#064e45", "#0b5f55", stroke="#5eead4", glow=True)
    a = iso(x + 0.65, y + 0.65, 0.5)
    add(f'<path d="M{a[0]:.1f},{a[1]-13:.1f} l11,4 v7 c0,7 -6,11 -11,13 c-5,-2 -11,-6 -11,-13 v-7 z" fill="#ccfbf1"/>')


def device(x, y, kind):
    a = iso(x, y, 0)
    if kind == "phone":
        add(f'<rect x="{a[0]-11:.1f}" y="{a[1]-38:.1f}" width="22" height="38" rx="4" fill="#0b1433" stroke="{CYAN}" stroke-width="1.6" filter="url(#glow)"/>')
    else:
        add(f'<rect x="{a[0]-26:.1f}" y="{a[1]-34:.1f}" width="52" height="32" rx="3" fill="#0b1433" stroke="{CYAN}" stroke-width="1.6" filter="url(#glow)"/>')
        add(f'<rect x="{a[0]-34:.1f}" y="{a[1]-2:.1f}" width="68" height="5" rx="2" fill="{CYAN_SOFT}"/>')


# --- document -----------------------------------------------------------------------------------
add(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}" role="img" '
    'aria-labelledby="t d" font-family="Inter, ui-sans-serif, system-ui, sans-serif">')
add('<title id="t">FuseScope Collector topology</title>')
add('<desc id="d">Inside a Kubernetes cluster, application pods on each node send OTLP over TLS 1.3 with a '
    'token to the FuseScope agent on their node, through a node-local Service. The agents send to the '
    'gateway over OTLP/gRPC on port 4322 with mTLS and a token. The gateway writes to ClickHouse over the '
    'native protocol and receives log pipelines, span mapping and the ingest policy from the FuseScope '
    'backend over OpAMP. Browsers and mobile apps send RUM to /rum/v1/* through an ingress, which '
    're-encrypts to the gateway on port 4319.</desc>')
add(f'''<defs>
  <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="{BG1}"/><stop offset="1" stop-color="{BG0}"/></linearGradient>
  <linearGradient id="chSide" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#0b1a3a"/><stop offset="0.5" stop-color="#173a6e"/><stop offset="1" stop-color="#0b1a3a"/></linearGradient>
  <filter id="glow" filterUnits="userSpaceOnUse" x="0" y="0" width="{W}" height="{H}"><feGaussianBlur stdDeviation="2.6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  <marker id="arrowC" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="{CYAN}"/></marker>
  <marker id="arrowV" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="{VIOLET}"/></marker>
  <style>
    .plate {{ fill: {MUTED}; font-size: 13px; font-weight: 600; letter-spacing: .12em; text-transform: uppercase; }}
    .pulse {{ stroke-dasharray: 4 40; animation: run 2.4s linear infinite; }}
    @keyframes run {{ to {{ stroke-dashoffset: -44; }} }}
    @media (prefers-reduced-motion: reduce) {{ .pulse {{ animation: none; }} }}
  </style>
</defs>''')
add(f'<rect width="{W}" height="{H}" fill="url(#bg)"/>')
# faint background dots
for i in range(0, W, 40):
    for j in range(0, H, 40):
        add(f'<circle cx="{i}" cy="{j}" r="0.9" fill="#1b2d55"/>')

add(f'<text x="48" y="64" fill="{TEXT}" font-size="30" font-weight="800">FuseScope Collector</text>')
add(f'<text x="48" y="94" fill="{MUTED}" font-size="16">How telemetry reaches ClickHouse, and what is public</text>')

# the cluster
plate(0, 0, 16, 11, 0.3)
plate(1, 1, 5, 3.6, 0.55)
plate(1, 6.2, 5, 3.6, 0.55)

# flows first, so the blocks sit on top of them
for yy in (1.6, 3.2):
    flow([(2.4, yy + 0.45), (3.0, yy + 0.45), (3.0, 2.8), (3.6, 2.8)], arrow=False, width=2.2, z=0.62)
for yy in (6.8, 8.4):
    flow([(2.4, yy + 0.45), (3.0, yy + 0.45), (3.0, 8.0), (3.6, 8.0)], arrow=False, width=2.2, z=0.62)
flow([(5.0, 2.8), (7.6, 2.8), (7.6, 4.8), (8.6, 4.8)])
flow([(5.0, 8.0), (7.6, 8.0), (7.6, 6.0), (8.6, 6.0)])
flow([(11.0, 5.4), (12.7, 5.4)])
flow([(9.8, 4.2), (9.8, 2.0)], color=VIOLET, dashed=True, z=0.4)
flow([(10.4, 13.6), (10.4, 10.2)])
flow([(11.3, 8.9), (11.3, 7.6), (10.4, 7.6), (10.4, 6.6)])

# blocks, back to front
backend(8.6, 0.4)
for yy in (1.6, 3.2):
    pod(1.5, yy)
agent(3.6, 2.1)
for yy in (6.8, 8.4):
    pod(1.5, yy)
agent(3.6, 7.3)
gateway(8.6, 4.2)
cylinder(13.6, 5.4, 0.85, 3, z0=0.3)
shield(10.65, 8.9)
device(9.6, 14.4, "laptop")
device(11.6, 14.4, "phone")

# plate names, drawn last so no block covers them
cl = iso(0, 11, 0)
add(f'<text x="{cl[0]+10:.1f}" y="{cl[1]+52:.1f}" class="plate">Kubernetes cluster</text>')
for name, ny in (("node A", 4.6), ("node B", 9.8)):
    q = iso(1, ny, 0.3)
    add(f'<text x="{q[0]-12:.1f}" y="{q[1]+20:.1f}" class="plate" text-anchor="end">{name}</text>')

# component callouts, in free space around the cluster
callout(iso(2.0, 2.0, 0.7), (420, 285), ["app pods", "OpenTelemetry SDKs"])
callout(iso(4.3, 7.9, 0.9), (330, 420), ["agent", "DaemonSet, one per node"])
callout(iso(9.9, 5.4, 3.7), (870, 175), ["gateway", "Deployment · the only writer"])
callout(iso(9.9, 0.7, 2.1), (1240, 300), ["FuseScope backend", "UI · OpAMP server"])
callout(iso(13.6, 5.4, 1.9), (1400, 560), ["ClickHouse", "native protocol"])
callout(iso(11.3, 9.5, 0.5), (1040, 900), ["ingress", "public TLS, re-encrypts to :4319"])
callout(iso(9.6, 14.6, 0), (560, 1050), ["browsers and mobile apps", "RUM · /rum/v1/* only · the one public path"])

# flow labels, on empty parts of the plates
callout(iso(3.0, 3.65, 0.62), (600, 205), ["OTLP · TLS 1.3 + token", "pods → the agent on their node"], size=13)
q = iso(7.2, 9.4, 0.3); label(q[0], q[1] + 4, [":4322 · OTLP/gRPC", "mTLS + token"], size=13)
callout(iso(9.8, 2.6, 0.4), (1300, 440), ["OpAMP", "processors + ingest policy"], color=VIOLET, size=13)

# legend
lx, ly = W - 468, 40
add(f'<rect x="{lx}" y="{ly}" width="420" height="62" rx="9" fill="#0a1430" fill-opacity="0.9" stroke="#24467f"/>')
add(f'<line x1="{lx+20}" y1="{ly+22}" x2="{lx+62}" y2="{ly+22}" stroke="{CYAN}" stroke-width="3.2" filter="url(#glow)"/>')
add(f'<text x="{lx+74}" y="{ly+27}" fill="{TEXT}" font-size="14">telemetry, TLS and authentication on every hop</text>')
add(f'<line x1="{lx+20}" y1="{ly+44}" x2="{lx+62}" y2="{ly+44}" stroke="{VIOLET}" stroke-width="3.2" stroke-dasharray="8 7"/>')
add(f'<text x="{lx+74}" y="{ly+49}" fill="{TEXT}" font-size="14">configuration from FuseScope (allow-listed)</text>')
add('</svg>')

dst = os.path.join(os.path.dirname(__file__), "..", "src", "assets", "collector", "topology.svg")
os.makedirs(os.path.dirname(dst), exist_ok=True)
with open(dst, "w") as f:
    f.write("\n".join(out) + "\n")
print(dst)
