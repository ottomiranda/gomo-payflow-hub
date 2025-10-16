import React, { useState } from 'react';
import { FeeDetailsSidebar } from './FeeDetailsSidebar';

interface InvoiceItem {
  name: string;
  description: string;
  amount: number;
  hasWhyThisFee?: boolean;
}

interface InvoiceBreakdownChartProps {
  items: InvoiceItem[];
  total: number;
}

// Paleta de cores moderna e vibrante
const CHART_COLORS = [
  '#00D9FF', // Cyan brilhante - Plano base
  '#FF6B35', // Laranja vibrante - Extras/roaming  
  '#FF3366', // Rosa/vermelho - Taxas/penalizações
  '#9B59B6', // Roxo elegante - Serviços premium
  '#2ECC71', // Verde esmeralda - Outros serviços
  '#F39C12', // Amarelo dourado - Adicionais
];

export function InvoiceBreakdownChart({ items, total }: InvoiceBreakdownChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedFee, setSelectedFee] = useState<any>(null);

  // Fee details data
  const feeDetailsMap: Record<string, FeeDetailsData> = {
    'Extra Roaming': {
      name: 'Extra Roaming',
      description: 'International data roaming usage',
      value: '£12.50',
      explanation: 'This fee is charged when you use mobile data outside your home country. International roaming has additional costs due to agreements between operators and international interconnection fees.',
      breakdown: [
        { item: 'Data used', amount: '250 MB' },
        { item: 'Rate per MB', amount: '£0.05' },
        { item: 'Total', amount: '£12.50' }
      ]
    },
    'Penalties and compensation': {
      name: 'Penalties and compensation',
      description: 'Applied penalties and compensations',
      value: '£5.00',
      explanation: 'This fee refers to penalties applied for excessive data usage or compensations for service interruptions. It may include fines for exceeding contractual limits or credits for service failures.',
      breakdown: [
        { item: 'Data excess penalty', amount: '£8.00' },
        { item: 'Service interruption compensation', amount: '-£3.00' },
        { item: 'Total', amount: '£5.00' }
      ]
    },
    'Base Plan': {
      name: 'Base Plan',
      description: 'Monthly basic plan',
      value: '£25.00',
      explanation: 'This is the value of your monthly basic plan that includes a specific amount of data, minutes and SMS. The base plan offers essential connectivity with predefined limits.',
      breakdown: [
        { item: 'Included data', amount: '5GB' },
        { item: 'Included minutes', amount: '500 min' },
        { item: 'Included SMS', amount: '1000 SMS' },
        { item: 'Monthly total', amount: '£25.00' }
      ]
    },
    'Premium Services': {
      name: 'Premium Services',
      description: 'Additional premium services',
      value: '£8.00',
      explanation: 'Premium services include advanced features such as HD streaming, network priority, premium technical support and access to exclusive content.',
      breakdown: [
        { item: 'HD streaming', amount: '£4.00' },
        { item: 'Network priority', amount: '£2.50' },
        { item: 'Premium support', amount: '£1.50' },
        { item: 'Total', amount: '£8.00' }
      ]
    },
    'Additional Services': {
      name: 'Additional Services',
      description: 'Additional contracted services',
      value: '£3.50',
      explanation: 'Additional services include extra features such as cloud backup, mobile antivirus, and other add-ons that enhance your mobile experience.',
      breakdown: [
        { item: 'Cloud backup', amount: '£2.00' },
        { item: 'Mobile antivirus', amount: '£1.50' },
        { item: 'Total', amount: '£3.50' }
      ]
    },
    'Other Services': {
      name: 'Other Services',
      description: 'Various other services',
      value: '£2.00',
      explanation: 'Other services include administrative fees, third-party services and other miscellaneous charges related to your mobile account.',
      breakdown: [
        { item: 'Administrative fee', amount: '£1.00' },
        { item: 'Third-party services', amount: '£1.00' },
        { item: 'Total', amount: '£2.00' }
      ]
    },
    'Premium SMS': {
      name: 'Premium SMS',
      description: 'Premium SMS messages sent',
      value: 'CHF 0.95',
      explanation: 'This fee refers to sending premium SMS messages to special numbers or value-added services. Premium SMS have higher costs due to the specialized nature of the service.',
      breakdown: [
        { item: 'Premium SMS sent', amount: '3 SMS' },
        { item: 'Rate per SMS', amount: 'CHF 0.30' },
        { item: 'Processing fee', amount: 'CHF 0.05' },
        { item: 'Total', amount: 'CHF 0.95' }
      ]
    },
    'GoMo Europe Plan': {
      name: 'GoMo Europe Plan',
      description: 'Unlimited data plan in Europe',
      value: 'CHF 19.95',
      explanation: 'This is your GoMo Europe plan that offers unlimited data throughout the European zone. The plan includes free roaming in EU countries and priority network access in popular European destinations.',
      breakdown: [
        { item: 'Unlimited Europe data', amount: 'Unlimited' },
        { item: 'EU roaming included', amount: 'Free' },
        { item: 'Network priority', amount: 'Included' },
        { item: 'Monthly fee', amount: 'CHF 19.95' }
      ]
    }
  };

  const handleFeeClick = (feeName: string) => {
    const feeData = feeDetailsMap[feeName as keyof typeof feeDetailsMap];
    if (feeData) {
      setSelectedFee(feeData);
      setSidebarOpen(true);
    }
  };

  // Calcular dados dos segmentos
  const segments = items.map((item, index) => {
    const percentage = (item.amount / total) * 100;
    const angle = (item.amount / total) * 360;
    return {
      ...item,
      percentage,
      angle,
      color: CHART_COLORS[index % CHART_COLORS.length],
    };
  });

  // Função para criar path do segmento do pie chart
  const createPieSlice = (
    centerX: number,
    centerY: number,
    radius: number,
    startAngle: number,
    endAngle: number,
    isHovered: boolean = false
  ) => {
    const adjustedRadius = isHovered ? radius + 8 : radius;
    const start = polarToCartesian(centerX, centerY, adjustedRadius, endAngle);
    const end = polarToCartesian(centerX, centerY, adjustedRadius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    return [
      "M", centerX, centerY,
      "L", start.x, start.y,
      "A", adjustedRadius, adjustedRadius, 0, largeArcFlag, 0, end.x, end.y,
      "Z"
    ].join(" ");
  };

  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  };

  const size = 220; // Reduzido de 280 para 220
  const center = size / 2;
  const radius = 80; // Reduzido de 100 para 80

  let cumulativeAngle = 0;

  return (
    <div className="w-full">
      {/* Container principal com layout responsivo */}
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6"> {/* Reduzido gap de 8 para 6 */}
        
        {/* Gráfico Pie Chart */}
        <div className="relative flex-shrink-0">
          <svg width={size} height={size} className="drop-shadow-lg"> {/* Reduzido shadow de 2xl para lg */}
            {/* Gradiente de fundo */}
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              {segments.map((segment, index) => (
                <linearGradient key={index} id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={segment.color} stopOpacity="1" />
                  <stop offset="100%" stopColor={segment.color} stopOpacity="0.8" />
                </linearGradient>
              ))}
            </defs>
            
            {/* Círculo de sombra */}
            <circle
              cx={center + 2}
              cy={center + 2}
              r={radius}
              fill="rgba(0, 0, 0, 0.1)"
            />
            
            {/* Segmentos do pie chart */}
            {segments.map((segment, index) => {
              const startAngle = cumulativeAngle;
              const endAngle = cumulativeAngle + segment.angle;
              const isHovered = hoveredIndex === index;
              cumulativeAngle += segment.angle;

              return (
                <path
                  key={index}
                  d={createPieSlice(center, center, radius, startAngle, endAngle, isHovered)}
                  fill={`url(#gradient-${index})`}
                  stroke="rgba(255, 255, 255, 0.2)"
                  strokeWidth="2"
                  filter="url(#glow)"
                  className="transition-all duration-300 cursor-pointer"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                />
              );
            })}
          </svg>

          {/* Valor total no centro com design moderno */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-center px-4 py-3"> {/* Removido fundo transparente e borda */}
              {hoveredIndex !== null ? (
                <>
                  <p className="text-xs text-gray-700 font-medium uppercase tracking-wider mb-1">
                    {segments[hoveredIndex].name}
                  </p>
                  <p className="text-2xl font-bold text-gray-800"> {/* Alterado para cinza escuro */}
                    <span className="font-sans">{segments[hoveredIndex].percentage.toFixed(1)}%</span>
                  </p>
                  <p className="text-sm text-gray-700 font-mono mt-1">
                    CHF {segments[hoveredIndex].amount.toFixed(2)}
                  </p>
                </>
              ) : (
                <>
                  <p className="text-xs text-gray-700 font-medium uppercase tracking-wider mb-1">Total Invoice</p>
                  <p className="text-2xl font-bold text-gray-800"> {/* Alterado para cinza escuro */}
                    <span className="font-sans text-lg">CHF </span>
                    <span className="font-mono">{total.toFixed(2)}</span>
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Legendas modernas */}
        <div className="flex-1 w-full lg:w-auto">
          <div className="grid gap-2"> {/* Reduzido gap de 3 para 2 */}
            {segments.map((segment, index) => (
              <div 
                key={index} 
                className={`group relative overflow-hidden rounded-xl p-3 transition-all duration-300 cursor-pointer ${ /* Reduzido padding de p-4 para p-3 */
                  hoveredIndex === index 
                    ? 'bg-white/15 scale-105 shadow-lg' 
                    : 'bg-white/5 hover:bg-white/10'
                }`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Barra de cor lateral */}
                <div 
                  className="absolute left-0 top-0 bottom-0 w-1 transition-all duration-300"
                  style={{ 
                    backgroundColor: segment.color,
                    width: hoveredIndex === index ? '4px' : '2px'
                  }}
                />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1 min-w-0">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm font-semibold text-white whitespace-nowrap leading-tight flex-1">{segment.name}</p>
                      </div>
                      <p className="text-xs text-white/70 break-words leading-relaxed mb-2">{segment.description}</p>
                    </div>
                  </div>
                  
                  {/* Valor com destaque e badge (i) */}
                  <div className="text-right flex-shrink-0 ml-4 flex items-center gap-2">
                    <p className={`font-bold text-lg text-white transition-all duration-300 ${
                      hoveredIndex === index ? 'scale-105' : ''
                    }`}>
                      CHF {segment.amount.toFixed(2)}
                    </p>
                    {(segment.hasWhyThisFee || true) && (
                       <button 
                         className="w-5 h-5 rounded-full bg-gray-500/20 border border-gray-400/30 flex items-center justify-center hover:bg-gray-500/30 transition-all duration-200 flex-shrink-0"
                         onClick={(e) => {
                           e.stopPropagation();
                           handleFeeClick(segment.name);
                         }}
                       >
                         <svg className="w-3 h-3 text-muted-foreground" fill="currentColor" viewBox="0 0 20 20">
                           <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                         </svg>
                       </button>
                     )}
                  </div>
                </div>
                
                {/* Barra de progresso animada */}
                <div className="mt-3 h-1 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-700 ease-out"
                    style={{ 
                      backgroundColor: segment.color,
                      width: hoveredIndex === index ? `${segment.percentage}%` : '0%'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fee Details Sidebar */}
      <FeeDetailsSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        feeData={selectedFee}
      />
    </div>
  );
}