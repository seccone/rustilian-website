export interface Subsection {
  title: string;
  content?: string;
  command?: string;
  language?: string;
  type?: "warning" | "note" | "info";
}

export interface Tweak {
  id: string;
  name: string;
  description: string;
  benefit: string;
  impactLevel: "low" | "medium" | "high";
  subsections: Subsection[];
}

export const networkThrottlingTweaks = {
  en: [
    {
      id: "network-throttling-overview",
      name: "Understanding Network Throttling",
      description:
        "Learn about Windows network throttling and how it impacts gaming performance",
      benefit:
        "Understanding throttling helps determine if disabling it will help your use case",
      impactLevel: "low" as const,
      subsections: [
        {
          title: "What is NetworkThrottlingIndex?",
          content:
            "Windows limits non-multimedia traffic processing to 10 packets per millisecond (approximately 100 Mbits/s) to prioritize multimedia applications. On Gigabit networks and in online gaming, this artificial limit can reduce performance.",
          type: "info",
        },
        {
          title: "Default Behavior",
          content:
            "Default value: 10 packets/ms\nFor media sharing: 10 packets/ms\nFor gaming/max throughput: 0xffffffff (disabled)",
          type: "info",
        },
        {
          title: "Performance Impact",
          content:
            "- Reduces ping spikes in online games\n- Improves maximum throughput on Gigabit networks\n- Better performance in games like TF2, CS:S, Left 4 Dead, HoN, CoD, and Overlord\n- Only effective on Gigabit connections (100+ Mbps)",
          type: "info",
        },
      ],
    },
    {
      id: "check-current-throttling",
      name: "Check Current Throttling Value",
      description: "View your current NetworkThrottlingIndex setting",
      benefit:
        "Verify your current network throttling configuration before making changes",
      impactLevel: "low" as const,
      subsections: [
        {
          title: "View Current Value",
          content:
            "This command shows your current NetworkThrottlingIndex value. Default is 10.",
          command:
            'Get-ItemProperty -Path "HKLM:\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile" -Name "NetworkThrottlingIndex"',
          language: "powershell",
        },
        {
          title: "Expected Default Output",
          content: "NetworkThrottlingIndex : 10",
          type: "info",
        },
      ],
    },
    {
      id: "disable-network-throttling",
      name: "Disable Network Throttling",
      description:
        "Set NetworkThrottlingIndex to maximum for gaming performance",
      benefit: "Removes Windows packet processing limit for maximum throughput",
      impactLevel: "high" as const,
      subsections: [
        {
          title: "Set NetworkThrottlingIndex to 0xffffffff",
          content:
            "This sets the value to the maximum (0xffffffff = 4294967295), effectively disabling throttling. Recommended for gaming on Gigabit networks.",
          command:
            'New-ItemProperty -Path "HKLM:\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile" -Name "NetworkThrottlingIndex" -PropertyType DWord -Value 0xffffffff -Force',
          language: "powershell",
        },
        {
          title: "Important",
          content:
            "This change requires administrator privileges and Windows restart to take effect.",
          type: "warning",
        },
      ],
    },
    {
      id: "verify-throttling-disabled",
      name: "Verify Throttling is Disabled",
      description:
        "Confirm that network throttling has been successfully disabled",
      benefit: "Ensures configuration changes took effect",
      impactLevel: "low" as const,
      subsections: [
        {
          title: "Check New Value",
          content:
            "After restarting Windows, verify the NetworkThrottlingIndex is now set to the maximum value.",
          command:
            'Get-ItemProperty -Path "HKLM:\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile" -Name "NetworkThrottlingIndex"',
          language: "powershell",
        },
        {
          title: "Expected Output After Disabling",
          content:
            "NetworkThrottlingIndex : 4294967295 (or shown in hex as 0xffffffff)",
          type: "info",
        },
      ],
    },
    {
      id: "network-throttling-when-to-use",
      name: "When to Use Network Throttling Disable",
      description: "Determine if disabling throttling is right for your setup",
      benefit: "Helps decide if this optimization applies to your gaming style",
      impactLevel: "medium" as const,
      subsections: [
        {
          title: "Recommended For",
          content:
            "✓ Gaming on Gigabit networks (100+ Mbps)\n✓ Online multiplayer games (FPS, MOBA, MMO)\n✓ Games experiencing ping spikes: TF2, CS:S, Left 4 Dead, HoN, CoD, Overlord\n✓ Systems where media streaming is not a priority",
          type: "info",
        },
        {
          title: "Not Recommended For",
          content:
            "✗ Systems with media streaming as priority\n✗ Non-Gigabit networks (under 100 Mbps)\n✗ General-purpose systems balancing gaming and media",
          type: "info",
        },
      ],
    },
    {
      id: "network-throttling-settings-reference",
      name: "NetworkThrottlingIndex Values Reference",
      description: "Understanding different NetworkThrottlingIndex values",
      benefit: "Reference guide for different throttling levels",
      impactLevel: "low" as const,
      subsections: [
        {
          title: "Common Values",
          content:
            "10 (0xa) - Default Windows setting, 10 packets/ms (~100 Mbits/s)\n10 (0xa) - Media sharing priority mode\n0xffffffff - Gaming mode, maximum throughput (disabled throttling)\n\nMost systems use 10 by default. Gaming optimized systems should use 0xffffffff.",
          type: "info",
        },
      ],
    },
    {
      id: "revert-network-throttling",
      name: "Revert Network Throttling",
      description: "Restore default network throttling settings",
      benefit: "Allows reverting to default behavior if needed",
      impactLevel: "medium" as const,
      subsections: [
        {
          title: "Restore Default Value",
          content:
            "This sets NetworkThrottlingIndex back to the default value of 10.",
          command:
            'Set-ItemProperty -Path "HKLM:\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile" -Name "NetworkThrottlingIndex" -Value 10',
          language: "powershell",
        },
        {
          title: "After Reverting",
          content:
            "Restart Windows for changes to take effect. Default throttling (10 packets/ms) will be restored.",
          type: "info",
        },
      ],
    },
    {
      id: "network-throttling-best-practices",
      name: "Network Throttling Best Practices",
      description:
        "Important guidelines for applying network throttling optimizations",
      benefit: "Prevents issues and ensures optimal configuration",
      impactLevel: "high" as const,
      subsections: [
        {
          title: "Before Making Changes",
          content:
            "1. Create a system restore point\n2. Run PowerShell as Administrator\n3. Check that you have a Gigabit network connection\n4. Verify your network speed: Run speed test before and after\n5. Test on non-critical network first",
          type: "warning",
        },
        {
          title: "Compatibility",
          content:
            "Works on Windows 7, 8, 10, and 11. Most effective on Gigabit networks. Minimal impact on networks under 100 Mbps.",
          type: "info",
        },
        {
          title: "Testing Results",
          content:
            "Expected improvements: Reduced ping spikes, faster downloads/uploads on Gigabit networks. Some users report 10-30% latency improvement in specific games.",
          type: "info",
        },
      ],
    },
  ] as Tweak[],
  es: [
    {
      id: "network-throttling-overview",
      name: "Entendiendo el Throttling de Red",
      description:
        "Aprende sobre el throttling de red de Windows y cómo impacta el rendimiento de juegos",
      benefit:
        "Entender el throttling ayuda a determinar si desactivarlo beneficiará tu uso",
      impactLevel: "low" as const,
      subsections: [
        {
          title: "¿Qué es NetworkThrottlingIndex?",
          content:
            "Windows limita el procesamiento de tráfico no-multimedia a 10 paquetes por milisegundo (aproximadamente 100 Mbits/s) para dar prioridad a aplicaciones multimedia. En redes Gigabit y en juegos online, este límite artificial puede reducir el rendimiento.",
          type: "info",
        },
        {
          title: "Comportamiento por Defecto",
          content:
            "Valor por defecto: 10 paquetes/ms\nPara compartir medios: 10 paquetes/ms\nPara gaming/máximo throughput: 0xffffffff (desactivado)",
          type: "info",
        },
        {
          title: "Impacto en Rendimiento",
          content:
            "- Reduce picos de ping en juegos online\n- Mejora el throughput máximo en redes Gigabit\n- Mejor rendimiento en juegos como TF2, CS:S, Left 4 Dead, HoN, CoD y Overlord\n- Solo efectivo en conexiones Gigabit (100+ Mbps)",
          type: "info",
        },
      ],
    },
    {
      id: "check-current-throttling",
      name: "Verificar Valor de Throttling Actual",
      description: "Ver tu configuración actual de NetworkThrottlingIndex",
      benefit:
        "Verifica tu configuración actual de throttling de red antes de hacer cambios",
      impactLevel: "low" as const,
      subsections: [
        {
          title: "Ver Valor Actual",
          content:
            "Este comando muestra tu valor actual de NetworkThrottlingIndex. El valor por defecto es 10.",
          command:
            'Get-ItemProperty -Path "HKLM:\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile" -Name "NetworkThrottlingIndex"',
          language: "powershell",
        },
        {
          title: "Salida Esperada por Defecto",
          content: "NetworkThrottlingIndex : 10",
          type: "info",
        },
      ],
    },
    {
      id: "disable-network-throttling",
      name: "Desactivar Throttling de Red",
      description:
        "Establece NetworkThrottlingIndex al máximo para rendimiento de gaming",
      benefit:
        "Elimina el límite de procesamiento de paquetes de Windows para máximo throughput",
      impactLevel: "high" as const,
      subsections: [
        {
          title: "Establecer NetworkThrottlingIndex a 0xffffffff",
          content:
            "Esto establece el valor al máximo (0xffffffff = 4294967295), desactivando efectivamente el throttling. Recomendado para gaming en redes Gigabit.",
          command:
            'New-ItemProperty -Path "HKLM:\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile" -Name "NetworkThrottlingIndex" -PropertyType DWord -Value 0xffffffff -Force',
          language: "powershell",
        },
        {
          title: "Importante",
          content:
            "Este cambio requiere privilegios de administrador y reinicio de Windows para tomar efecto.",
          type: "warning",
        },
      ],
    },
    {
      id: "verify-throttling-disabled",
      name: "Verificar que Throttling está Desactivado",
      description:
        "Confirma que el throttling de red ha sido desactivado exitosamente",
      benefit: "Asegura que los cambios de configuración tuvieron efecto",
      impactLevel: "low" as const,
      subsections: [
        {
          title: "Verificar Nuevo Valor",
          content:
            "Después de reiniciar Windows, verifica que NetworkThrottlingIndex ahora esté establecido al valor máximo.",
          command:
            'Get-ItemProperty -Path "HKLM:\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile" -Name "NetworkThrottlingIndex"',
          language: "powershell",
        },
        {
          title: "Salida Esperada Después de Desactivar",
          content:
            "NetworkThrottlingIndex : 4294967295 (o mostrado en hex como 0xffffffff)",
          type: "info",
        },
      ],
    },
    {
      id: "network-throttling-when-to-use",
      name: "Cuándo Usar Desactivar Throttling de Red",
      description:
        "Determina si desactivar el throttling es adecuado para tu configuración",
      benefit:
        "Ayuda a decidir si esta optimización aplica a tu estilo de gaming",
      impactLevel: "medium" as const,
      subsections: [
        {
          title: "Recomendado Para",
          content:
            "✓ Gaming en redes Gigabit (100+ Mbps)\n✓ Juegos multijugador online (FPS, MOBA, MMO)\n✓ Juegos con picos de ping: TF2, CS:S, Left 4 Dead, HoN, CoD, Overlord\n✓ Sistemas donde el streaming multimedia no es prioridad",
          type: "info",
        },
        {
          title: "No Recomendado Para",
          content:
            "✗ Sistemas con streaming multimedia como prioridad\n✗ Redes no-Gigabit (menos de 100 Mbps)\n✗ Sistemas de propósito general balanceando gaming y multimedia",
          type: "info",
        },
      ],
    },
    {
      id: "network-throttling-settings-reference",
      name: "Referencia de Valores NetworkThrottlingIndex",
      description: "Entendiendo diferentes valores de NetworkThrottlingIndex",
      benefit: "Guía de referencia para diferentes niveles de throttling",
      impactLevel: "low" as const,
      subsections: [
        {
          title: "Valores Comunes",
          content:
            "10 (0xa) - Configuración por defecto de Windows, 10 paquetes/ms (~100 Mbits/s)\n10 (0xa) - Modo prioridad de compartir medios\n0xffffffff - Modo gaming, máximo throughput (throttling desactivado)\n\nLa mayoría de sistemas usan 10 por defecto. Los sistemas optimizados para gaming deberían usar 0xffffffff.",
          type: "info",
        },
      ],
    },
    {
      id: "revert-network-throttling",
      name: "Revertir Throttling de Red",
      description: "Restaura la configuración de throttling de red por defecto",
      benefit: "Permite revertir a comportamiento por defecto si es necesario",
      impactLevel: "medium" as const,
      subsections: [
        {
          title: "Restaurar Valor por Defecto",
          content:
            "Esto establece NetworkThrottlingIndex de vuelta al valor por defecto de 10.",
          command:
            'Set-ItemProperty -Path "HKLM:\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile" -Name "NetworkThrottlingIndex" -Value 10',
          language: "powershell",
        },
        {
          title: "Después de Revertir",
          content:
            "Reinicia Windows para que los cambios tengan efecto. Se restaurará el throttling por defecto (10 paquetes/ms).",
          type: "info",
        },
      ],
    },
    {
      id: "network-throttling-best-practices",
      name: "Mejores Prácticas de Throttling de Red",
      description:
        "Directrices importantes para aplicar optimizaciones de throttling de red",
      benefit: "Previene problemas y asegura configuración óptima",
      impactLevel: "high" as const,
      subsections: [
        {
          title: "Antes de Hacer Cambios",
          content:
            "1. Crea un punto de restauración del sistema\n2. Ejecuta PowerShell como Administrador\n3. Verifica que tengas una conexión de red Gigabit\n4. Verifica tu velocidad de red: Ejecuta test de velocidad antes y después\n5. Prueba en una red no crítica primero",
          type: "warning",
        },
        {
          title: "Compatibilidad",
          content:
            "Funciona en Windows 7, 8, 10 y 11. Más efectivo en redes Gigabit. Impacto mínimo en redes bajo 100 Mbps.",
          type: "info",
        },
        {
          title: "Resultados de Pruebas",
          content:
            "Mejoras esperadas: Reducción de picos de ping, descargas/cargas más rápidas en redes Gigabit. Algunos usuarios reportan mejora de 10-30% de latencia en juegos específicos.",
          type: "info",
        },
      ],
    },
  ] as Tweak[],
};
