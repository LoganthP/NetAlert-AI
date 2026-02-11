import { ComposableMap, Geographies, Geography, Marker, Line, ZoomableGroup } from "react-simple-maps";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FullFlowData } from '@/lib/types';
import { useMemo, useState } from 'react';
import { Globe, Plus, Minus } from 'lucide-react';
import { format } from 'date-fns';
import { Tooltip } from 'react-tooltip';

// GeoJSON for the world map
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

interface LiveAttackMapProps {
    flows: FullFlowData[];
}

export function LiveAttackMap({ flows }: LiveAttackMapProps) {
    const [position, setPosition] = useState({ coordinates: [0, 20] as [number, number], zoom: 1 });

    // Filter flows that have geo data
    const geoFlows = useMemo(() =>
        flows.filter(f => f.src_lat && f.src_lon && f.dst_lat && f.dst_lon).slice(0, 50),
        [flows]);

    const handleZoomIn = () => {
        if (position.zoom >= 4) return;
        setPosition((pos) => ({ ...pos, zoom: pos.zoom * 1.2 }));
    };

    const handleZoomOut = () => {
        if (position.zoom <= 1) return;
        setPosition((pos) => ({ ...pos, zoom: pos.zoom / 1.2 }));
    };

    const handleMoveEnd = (position: { coordinates: [number, number]; zoom: number }) => {
        setPosition(position);
    };

    // ... (imports)

    // ... (component start)

    return (
        <Card className="col-span-12 border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden text-card-foreground">
            <CardHeader className="pb-0 pt-4 px-6">
                <div className="flex justify-between items-center">
                    <div className="space-y-1">
                        <CardTitle className="text-sm font-semibold text-card-foreground flex items-center gap-2">
                            <Globe className="h-4 w-4 text-cyan-500" />
                            Global Threat Map
                        </CardTitle>
                        <CardDescription className="text-xs text-muted-foreground">
                            Interactive visualization • Zoom & Pan • Hover markers for details
                        </CardDescription>
                    </div>
                    <div className="flex items-center gap-4 text-xs font-mono">
                        <div className="flex gap-2 mr-4 bg-secondary/50 p-1 rounded-md border border-border/50">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 text-muted-foreground hover:text-foreground hover:bg-background/50"
                                onClick={handleZoomOut}
                                title="Zoom Out"
                            >
                                <Minus className="h-3 w-3" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 text-muted-foreground hover:text-foreground hover:bg-background/50"
                                onClick={handleZoomIn}
                                title="Zoom In"
                            >
                                <Plus className="h-3 w-3" />
                            </Button>
                        </div>
                        <span className="flex items-center gap-1.5 text-muted-foreground">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(34,211,238,0.8)]"></span>
                            Active
                        </span>
                        <span className="flex items-center gap-1.5 text-muted-foreground">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)] animate-pulse"></span>
                            Anomaly
                        </span>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-0 h-[500px] w-full relative">
                <ComposableMap
                    projection="geoMercator"
                    projectionConfig={{
                        scale: 110,
                    }}
                    style={{
                        width: "100%",
                        height: "100%",
                        backgroundColor: "transparent"
                    }}
                >
                    <ZoomableGroup
                        zoom={position.zoom}
                        center={position.coordinates}
                        onMoveEnd={handleMoveEnd}
                        maxZoom={4}
                    >
                        <Geographies geography={geoUrl}>
                            {({ geographies }) =>
                                geographies.map((geo) => (
                                    <Geography
                                        key={geo.rsmKey}
                                        geography={geo}
                                        fill="hsl(var(--secondary))"
                                        stroke="hsl(var(--border))"
                                        strokeWidth={0.5}
                                        style={{
                                            default: { outline: "none" },
                                            hover: { fill: "hsl(var(--primary))", outline: "none", stroke: "hsl(var(--primary))", fillOpacity: 0.2 },
                                            pressed: { outline: "none" },
                                        }}
                                        data-tooltip-id="map-tooltip"
                                        data-tooltip-content={geo.properties.name}
                                        data-tooltip-variant="dark"
                                    />
                                ))
                            }
                        </Geographies>

                        {/* Threat Lines (Arcs) */}
                        {geoFlows.map((flow) => (
                            <Line
                                key={`line-${flow.id}`}
                                from={[flow.src_lon!, flow.src_lat!]}
                                to={[flow.dst_lon!, flow.dst_lat!]}
                                stroke={flow.is_anomaly ? "#ef4444" : "#06b6d4"}
                                strokeWidth={flow.is_anomaly ? 1.5 : 0.8}
                                strokeOpacity={0.6}
                                strokeLinecap="round"
                                data-tooltip-id="map-tooltip"
                                data-tooltip-html={`
                                    <div class="flex flex-col gap-0.5 min-w-[150px]">
                                        <div class="font-semibold text-xs ${flow.is_anomaly ? 'text-red-400' : 'text-cyan-400'}">${flow.protocol} Traffic</div>
                                        <div class="text-[10px] text-slate-300">From <span class="text-white">${flow.src_country}</span> to <span class="text-white">${flow.dst_country}</span></div>
                                        <div class="text-[10px] text-slate-500 mt-0.5">${format(new Date(flow.timestamp), 'HH:mm:ss')}</div>
                                    </div>
                                `}
                            />
                        ))}

                        {/* Source Markers with React Tooltip */}
                        {geoFlows.map((flow) => (
                            <Marker key={`src-${flow.id}`} coordinates={[flow.src_lon!, flow.src_lat!]}>
                                <circle r={8} fill="transparent"
                                    className="cursor-pointer"
                                    data-tooltip-id="map-tooltip"
                                    data-tooltip-html={`
                                        <div class="flex flex-col gap-0.5 min-w-[180px]">
                                            <div class="font-semibold ${flow.is_anomaly ? 'text-red-400' : 'text-cyan-400'}">${flow.is_anomaly ? 'THREAT DETECTED' : 'active connection'}</div>
                                            <div class="text-xs text-slate-300">Src: <span class="text-white">${flow.src_ip}</span> <span class="text-slate-500">(${flow.src_country})</span></div>
                                            <div class="text-xs text-slate-300">Dst: <span class="text-white">${flow.dst_ip}</span> <span class="text-slate-500">(${flow.dst_country})</span></div>
                                            <div class="text-[10px] uppercase tracking-wider text-slate-500 mt-1 pb-1 border-b border-white/10">${format(new Date(flow.timestamp), 'MMM d, HH:mm:ss')} • ${flow.protocol}</div>
                                        </div>
                                    `}
                                />
                                <circle r={3} fill={flow.is_anomaly ? "#ef4444" : "#06b6d4"} className="animate-ping opacity-75 pointer-events-none" />
                                <circle
                                    r={1.5}
                                    fill="#fff"
                                    className="pointer-events-none"
                                />
                            </Marker>
                        ))}
                        {/* Destination Markers */}
                        {geoFlows.map((flow) => (
                            <Marker key={`dst-${flow.id}`} coordinates={[flow.dst_lon!, flow.dst_lat!]}>
                                <circle r={6} fill="transparent"
                                    className="cursor-pointer"
                                    data-tooltip-id="map-tooltip"
                                    data-tooltip-html={`
                                        <div class="flex flex-col gap-0.5 min-w-[180px]">
                                            <div class="font-semibold text-slate-200">Destination Target</div>
                                            <div class="text-xs text-slate-300">IP: <span class="text-white">${flow.dst_ip}</span></div>
                                            <div class="text-xs text-slate-300">Location: <span class="text-white">${flow.dst_country}</span></div>
                                            <div class="text-xs text-slate-500 mt-1">Targeted by: <span class="text-white">${flow.src_ip}</span></div>
                                        </div>
                                    `}
                                />
                                <circle
                                    r={1.5}
                                    fill={flow.is_anomaly ? "#ef4444" : "#06b6d4"}
                                    className="opacity-50 pointer-events-none"
                                />
                            </Marker>
                        ))}
                    </ZoomableGroup>
                </ComposableMap>

                {/* Overlay Grid Effect */}
                <div className="absolute inset-0 pointer-events-none bg-[url('/grid-pattern.svg')] opacity-10 mix-blend-overlay dark:mix-blend-overlay invert dark:invert-0"></div>

                {/* Global Tooltip Component - Keeping Dark for Contrast */}
                <Tooltip
                    id="map-tooltip"
                    place="top"
                    style={{
                        backgroundColor: "rgba(15, 23, 42, 0.95)",
                        color: "#f8fafc",
                        border: "1px solid rgba(255,255,255,0.1)",
                        backdropFilter: "blur(4px)",
                        fontSize: "12px",
                        zIndex: 50,
                        padding: "8px 12px",
                        borderRadius: "8px",
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
                    }}
                />
            </CardContent>
        </Card>
    );
}
