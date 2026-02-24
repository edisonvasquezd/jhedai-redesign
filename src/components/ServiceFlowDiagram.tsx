import { useCallback, useMemo } from 'react';
import ReactFlow, {
    type Node,
    type Edge,
    Background,
    Position,
    MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';

interface ServiceFlowDiagramProps {
    steps: string[];
    type: 'linear' | 'branching' | 'circular' | 'hierarchical';
    gradient: string;
}

const ServiceFlowDiagram = ({ steps, type, gradient }: ServiceFlowDiagramProps) => {
    // Extract gradient colors
    const getGradientColors = (gradientClass: string) => {
        const colorMap: Record<string, string> = {
            'blue-500': '#3b82f6',
            'cyan-500': '#06b6d4',
            'purple-500': '#a855f7',
            'pink-500': '#ec4899',
            'red-500': '#ef4444',
            'green-500': '#22c55e',
            'emerald-500': '#10b981',
            'teal-500': '#14b8a6',
            'orange-500': '#f97316',
            'amber-500': '#f59e0b',
            'yellow-500': '#eab308',
            'indigo-500': '#6366f1',
            'rose-500': '#f43f5e',
        };

        // Extract first color from gradient string
        const match = gradientClass.match(/from-(\w+-\d+)/);
        if (match && match[1]) {
            return colorMap[match[1]] || '#3b82f6';
        }
        return '#3b82f6';
    };

    const primaryColor = getGradientColors(gradient);

    // Generate nodes and edges based on type
    const { nodes, edges } = useMemo(() => {
        const nodeStyle = {
            background: 'white',
            border: `2px solid ${primaryColor}`,
            borderRadius: '12px',
            padding: '12px 20px',
            fontSize: '13px',
            fontWeight: '600',
            color: '#0a2540',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        };

        const createNodes = (): Node[] => {
            switch (type) {
                case 'linear':
                    return steps.map((step, i) => ({
                        id: `${i}`,
                        data: { label: step },
                        position: { x: i * 150, y: 50 },
                        style: nodeStyle,
                        sourcePosition: Position.Right,
                        targetPosition: Position.Left,
                    }));

                case 'branching':
                    // First node, then split into two branches, then merge
                    return [
                        {
                            id: '0',
                            data: { label: steps[0] },
                            position: { x: 0, y: 100 },
                            style: nodeStyle,
                            sourcePosition: Position.Right,
                            targetPosition: Position.Left,
                        },
                        {
                            id: '1',
                            data: { label: steps[1] },
                            position: { x: 150, y: 100 },
                            style: nodeStyle,
                            sourcePosition: Position.Right,
                            targetPosition: Position.Left,
                        },
                        {
                            id: '2',
                            data: { label: steps[2] },
                            position: { x: 300, y: 30 },
                            style: nodeStyle,
                            sourcePosition: Position.Right,
                            targetPosition: Position.Left,
                        },
                        {
                            id: '3',
                            data: { label: steps[3] },
                            position: { x: 300, y: 150 },
                            style: nodeStyle,
                            sourcePosition: Position.Right,
                            targetPosition: Position.Left,
                        },
                        {
                            id: '4',
                            data: { label: steps[4] },
                            position: { x: 450, y: 100 },
                            style: nodeStyle,
                            sourcePosition: Position.Right,
                            targetPosition: Position.Left,
                        },
                    ];

                case 'circular':
                    // Arrange in a circle
                    const centerX = 200;
                    const centerY = 100;
                    const radius = 120;
                    return steps.map((step, i) => {
                        const angle = (i / steps.length) * 2 * Math.PI - Math.PI / 2;
                        return {
                            id: `${i}`,
                            data: { label: step },
                            position: {
                                x: centerX + radius * Math.cos(angle) - 40,
                                y: centerY + radius * Math.sin(angle) - 20,
                            },
                            style: nodeStyle,
                            sourcePosition: Position.Right,
                            targetPosition: Position.Left,
                        };
                    });

                case 'hierarchical':
                    // Tree structure: 1 root, 2 middle, 2 leaves
                    return [
                        {
                            id: '0',
                            data: { label: steps[0] },
                            position: { x: 200, y: 0 },
                            style: nodeStyle,
                            sourcePosition: Position.Bottom,
                            targetPosition: Position.Top,
                        },
                        {
                            id: '1',
                            data: { label: steps[1] },
                            position: { x: 200, y: 80 },
                            style: nodeStyle,
                            sourcePosition: Position.Bottom,
                            targetPosition: Position.Top,
                        },
                        {
                            id: '2',
                            data: { label: steps[2] },
                            position: { x: 100, y: 160 },
                            style: nodeStyle,
                            sourcePosition: Position.Bottom,
                            targetPosition: Position.Top,
                        },
                        {
                            id: '3',
                            data: { label: steps[3] },
                            position: { x: 300, y: 160 },
                            style: nodeStyle,
                            sourcePosition: Position.Bottom,
                            targetPosition: Position.Top,
                        },
                        {
                            id: '4',
                            data: { label: steps[4] },
                            position: { x: 200, y: 240 },
                            style: nodeStyle,
                            sourcePosition: Position.Bottom,
                            targetPosition: Position.Top,
                        },
                    ];

                default:
                    return [];
            }
        };

        const createEdges = (): Edge[] => {
            const edgeStyle = {
                stroke: primaryColor,
                strokeWidth: 2,
            };

            switch (type) {
                case 'linear':
                    return steps.slice(0, -1).map((_, i) => ({
                        id: `e${i}-${i + 1}`,
                        source: `${i}`,
                        target: `${i + 1}`,
                        type: 'smoothstep',
                        animated: true,
                        style: edgeStyle,
                        markerEnd: {
                            type: MarkerType.ArrowClosed,
                            color: primaryColor,
                        },
                    }));

                case 'branching':
                    return [
                        {
                            id: 'e0-1',
                            source: '0',
                            target: '1',
                            type: 'smoothstep',
                            animated: true,
                            style: edgeStyle,
                            markerEnd: { type: MarkerType.ArrowClosed, color: primaryColor },
                        },
                        {
                            id: 'e1-2',
                            source: '1',
                            target: '2',
                            type: 'smoothstep',
                            animated: true,
                            style: edgeStyle,
                            markerEnd: { type: MarkerType.ArrowClosed, color: primaryColor },
                        },
                        {
                            id: 'e1-3',
                            source: '1',
                            target: '3',
                            type: 'smoothstep',
                            animated: true,
                            style: edgeStyle,
                            markerEnd: { type: MarkerType.ArrowClosed, color: primaryColor },
                        },
                        {
                            id: 'e2-4',
                            source: '2',
                            target: '4',
                            type: 'smoothstep',
                            animated: true,
                            style: edgeStyle,
                            markerEnd: { type: MarkerType.ArrowClosed, color: primaryColor },
                        },
                        {
                            id: 'e3-4',
                            source: '3',
                            target: '4',
                            type: 'smoothstep',
                            animated: true,
                            style: edgeStyle,
                            markerEnd: { type: MarkerType.ArrowClosed, color: primaryColor },
                        },
                    ];

                case 'circular':
                    const circularEdges = steps.map((_, i) => ({
                        id: `e${i}-${(i + 1) % steps.length}`,
                        source: `${i}`,
                        target: `${(i + 1) % steps.length}`,
                        type: 'smoothstep',
                        animated: true,
                        style: edgeStyle,
                        markerEnd: {
                            type: MarkerType.ArrowClosed,
                            color: primaryColor,
                        },
                    }));
                    return circularEdges;

                case 'hierarchical':
                    return [
                        {
                            id: 'e0-1',
                            source: '0',
                            target: '1',
                            type: 'smoothstep',
                            animated: true,
                            style: edgeStyle,
                            markerEnd: { type: MarkerType.ArrowClosed, color: primaryColor },
                        },
                        {
                            id: 'e1-2',
                            source: '1',
                            target: '2',
                            type: 'smoothstep',
                            animated: true,
                            style: edgeStyle,
                            markerEnd: { type: MarkerType.ArrowClosed, color: primaryColor },
                        },
                        {
                            id: 'e1-3',
                            source: '1',
                            target: '3',
                            type: 'smoothstep',
                            animated: true,
                            style: edgeStyle,
                            markerEnd: { type: MarkerType.ArrowClosed, color: primaryColor },
                        },
                        {
                            id: 'e2-4',
                            source: '2',
                            target: '4',
                            type: 'smoothstep',
                            animated: true,
                            style: edgeStyle,
                            markerEnd: { type: MarkerType.ArrowClosed, color: primaryColor },
                        },
                        {
                            id: 'e3-4',
                            source: '3',
                            target: '4',
                            type: 'smoothstep',
                            animated: true,
                            style: edgeStyle,
                            markerEnd: { type: MarkerType.ArrowClosed, color: primaryColor },
                        },
                    ];

                default:
                    return [];
            }
        };

        return {
            nodes: createNodes(),
            edges: createEdges(),
        };
    }, [steps, type, primaryColor]);

    const onNodesChange = useCallback(() => {}, []);
    const onEdgesChange = useCallback(() => {}, []);

    return (
        <div className="w-full h-[300px] rounded-xl overflow-hidden bg-gradient-to-br from-gray-50 to-blue-50/20">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                fitView
                attributionPosition="bottom-right"
                nodesDraggable={false}
                nodesConnectable={false}
                elementsSelectable={false}
                panOnDrag={false}
                zoomOnScroll={false}
                zoomOnPinch={false}
                zoomOnDoubleClick={false}
                preventScrolling={true}
            >
                <Background color="#e2e8f0" gap={16} size={1} />
            </ReactFlow>
        </div>
    );
};

export default ServiceFlowDiagram;
