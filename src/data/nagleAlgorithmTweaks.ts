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

export const nagleAlgorithmTweaks = {
  en: [
    {
      id: "nagle-overview",
      name: "Understanding Nagle Algorithm",
      description:
        "Learn what Nagle algorithm does and why disabling it helps gaming",
      benefit:
        "Understanding helps determine if disabling Nagle is right for your use case",
      impactLevel: "low" as const,
      subsections: [
        {
          title: "What is Nagle Algorithm?",
          content:
            "Nagle algorithm combines several small packets into one larger packet to improve efficiency. This reduces network overhead but introduces a small delay (up to 40ms) that can be problematic for gaming and real-time applications.",
          type: "info",
        },
        {
          title: "Benefits of Disabling",
          content:
            "- Reduces latency up to 50% in MMOs like World of Warcraft and Diablo III\n- Improves response time in FPS and MOBA games\n- Eliminates micro-stuttering on consistent connections\n- Better real-time communication",
          type: "info",
        },
        {
          title: "Caution",
          content:
            "Disabling Nagle can reduce performance on large file transfers. Only recommended for gaming-focused systems.",
          type: "warning",
        },
      ],
    },
    {
      id: "find-nic-guid",
      name: "Find Network Adapter GUID",
      description:
        "Locate your network adapter's GUID for registry configuration",
      benefit:
        "Required first step to apply Nagle algorithm tweaks to the correct NIC",
      impactLevel: "low" as const,
      subsections: [
        {
          title: "Get Network Adapter GUID",
          content:
            "This command lists all network adapters and their GUIDs. Find your active gaming network adapter.",
          command: "Get-NetAdapter | Select-Object Name, InterfaceGuid",
          language: "powershell",
        },
        {
          title: "Registry Path",
          content:
            "Registry location for network settings: HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Services\\Tcpip\\Parameters\\Interfaces\\{NIC-GUID}",
          type: "info",
        },
      ],
    },
    {
      id: "tcp-ack-frequency",
      name: "Configure TcpAckFrequency",
      description: "Disable TCP acknowledgment delay to reduce latency",
      benefit: "Main setting for Nagle algorithm optimization",
      impactLevel: "high" as const,
      subsections: [
        {
          title: "Set TcpAckFrequency to 1",
          content:
            "Default value: 2 (introduces ~200ms delay through Nagle algorithm)\nRecommended: 1 (disables Nagle buffering)\n\nReplace {NIC-GUID} with your adapter's GUID from previous step.",
          command:
            '$nicPath = "HKLM:\\SYSTEM\\CurrentControlSet\\Services\\Tcpip\\Parameters\\Interfaces\\{NIC-GUID}"\nNew-ItemProperty -Path $nicPath -Name "TcpAckFrequency" -PropertyType DWord -Value 1 -Force',
          language: "powershell",
        },
        {
          title: "Important",
          content:
            "Replace {NIC-GUID} with your actual network adapter GUID. Get it from the previous step.",
          type: "warning",
        },
      ],
    },
    {
      id: "tcp-no-delay",
      name: "Enable TCPNoDelay",
      description: "Disable TCP Nagle algorithm at the protocol level",
      benefit: "Ensures immediate packet transmission without buffering",
      impactLevel: "high" as const,
      subsections: [
        {
          title: "Set TCPNoDelay to 1",
          content:
            "TCPNoDelay disables Nagle algorithm completely. Value 1 = Enabled (disables Nagle).\n\nReplace {NIC-GUID} with your adapter's GUID.",
          command:
            '$nicPath = "HKLM:\\SYSTEM\\CurrentControlSet\\Services\\Tcpip\\Parameters\\Interfaces\\{NIC-GUID}"\nNew-ItemProperty -Path $nicPath -Name "TCPNoDelay" -PropertyType DWord -Value 1 -Force',
          language: "powershell",
        },
      ],
    },
    {
      id: "tcp-del-ack-ticks",
      name: "Configure TcpDelAckTicks (Optional)",
      description: "Fine-tune TCP delayed acknowledgment timing",
      benefit: "Further reduces acknowledgment delay for ultra-low latency",
      impactLevel: "medium" as const,
      subsections: [
        {
          title: "Set TcpDelAckTicks to 0",
          content:
            "TcpDelAckTicks controls the number of acknowledgments delayed. Setting to 0 means no delay.\n\nReplace {NIC-GUID} with your adapter's GUID.",
          command:
            '$nicPath = "HKLM:\\SYSTEM\\CurrentControlSet\\Services\\Tcpip\\Parameters\\Interfaces\\{NIC-GUID}"\nNew-ItemProperty -Path $nicPath -Name "TcpDelAckTicks" -PropertyType DWord -Value 0 -Force',
          language: "powershell",
        },
        {
          title: "Note",
          content:
            "This setting is optional but recommended for maximum latency reduction in competitive gaming.",
          type: "info",
        },
      ],
    },
    {
      id: "msmq-tcp-no-delay",
      name: "Enable TCPNoDelay for MSMQ",
      description: "Apply TCPNoDelay to Message Queuing if you use MSMQ",
      benefit: "Ensures MSMQ uses low-latency TCP communication",
      impactLevel: "low" as const,
      subsections: [
        {
          title: "Set MSMQ TCPNoDelay",
          content:
            "If you use MSMQ (Message Queuing), apply TCPNoDelay setting at the MSMQ level.",
          command:
            '$msmqPath = "HKLM:\\SOFTWARE\\Microsoft\\MSMQ\\Parameters"\nNew-ItemProperty -Path $msmqPath -Name "TCPNoDelay" -PropertyType DWord -Value 1 -Force',
          language: "powershell",
        },
        {
          title: "When to Use",
          content:
            "Only applies if you use MSMQ for enterprise messaging. Skip if you don't use MSMQ.",
          type: "info",
        },
      ],
    },
    {
      id: "verify-settings",
      name: "Verify Nagle Settings",
      description:
        "Check that your Nagle algorithm settings were applied correctly",
      benefit: "Confirms configuration changes took effect",
      impactLevel: "low" as const,
      subsections: [
        {
          title: "Check Registry Values",
          content:
            "After applying settings, verify they appear in the registry. Replace {NIC-GUID} with your adapter GUID.",
          command:
            'Get-ItemProperty -Path "HKLM:\\SYSTEM\\CurrentControlSet\\Services\\Tcpip\\Parameters\\Interfaces\\{NIC-GUID}" | Select-Object TcpAckFrequency, TCPNoDelay, TcpDelAckTicks',
          language: "powershell",
        },
        {
          title: "Expected Values",
          content: "TcpAckFrequency: 1\nTCPNoDelay: 1\nTcpDelAckTicks: 0",
          type: "info",
        },
      ],
    },
    {
      id: "revert-changes",
      name: "Revert Nagle Changes",
      description: "Remove Nagle algorithm modifications to return to defaults",
      benefit: "Allows reverting settings if they cause issues",
      impactLevel: "medium" as const,
      subsections: [
        {
          title: "Remove Nagle Settings",
          content:
            "This removes the three main Nagle settings from registry. Replace {NIC-GUID} with your adapter GUID.",
          command:
            '$nicPath = "HKLM:\\SYSTEM\\CurrentControlSet\\Services\\Tcpip\\Parameters\\Interfaces\\{NIC-GUID}"\nRemove-ItemProperty -Path $nicPath -Name "TcpAckFrequency" -ErrorAction SilentlyContinue\nRemove-ItemProperty -Path $nicPath -Name "TCPNoDelay" -ErrorAction SilentlyContinue\nRemove-ItemProperty -Path $nicPath -Name "TcpDelAckTicks" -ErrorAction SilentlyContinue',
          language: "powershell",
        },
        {
          title: "After Reverting",
          content:
            "Restart Windows for changes to take effect. This will restore default Nagle algorithm behavior.",
          type: "info",
        },
      ],
    },
    {
      id: "nagle-best-practices",
      name: "Nagle Algorithm Best Practices",
      description:
        "Important guidelines for safely applying Nagle optimizations",
      benefit: "Prevents issues and ensures optimal configuration",
      impactLevel: "high" as const,
      subsections: [
        {
          title: "Before Making Changes",
          content:
            "1. Create a system restore point\n2. Run PowerShell as Administrator\n3. Note your NIC GUID before making changes\n4. Test on a non-critical network first\n5. Restart Windows after applying",
          type: "warning",
        },
        {
          title: "Compatibility",
          content:
            "Works on Windows 7, 8, 10, and 11. Also improves WiFi performance slightly.",
          type: "info",
        },
        {
          title: "When to Use",
          content:
            "Recommended for: Gaming, MMOs, FPS games, real-time applications\nNot recommended for: Heavy file transfer systems, general-purpose servers",
          type: "info",
        },
      ],
    },
  ] as Tweak[],
  es: [
    {
      id: "nagle-overview",
      name: "Entendiendo el Algoritmo de Nagle",
      description:
        "Aprende qué hace el algoritmo de Nagle y por qué desactivarlo ayuda a los juegos",
      benefit:
        "Entender ayuda a determinar si desactivar Nagle es adecuado para tu caso de uso",
      impactLevel: "low" as const,
      subsections: [
        {
          title: "¿Qué es el Algoritmo de Nagle?",
          content:
            "El algoritmo de Nagle combina varios paquetes pequeños en uno más grande para mejorar la eficiencia. Esto reduce el overhead de red pero introduce un pequeño retraso (hasta 40ms) que puede ser problemático para juegos y aplicaciones en tiempo real.",
          type: "info",
        },
        {
          title: "Beneficios de Desactivarlo",
          content:
            "- Reduce la latencia hasta 50% en MMOs como World of Warcraft y Diablo III\n- Mejora el tiempo de respuesta en juegos FPS y MOBA\n- Elimina micro-stuttering en conexiones consistentes\n- Mejor comunicación en tiempo real",
          type: "info",
        },
        {
          title: "Precaución",
          content:
            "Desactivar Nagle puede reducir el rendimiento en transferencias de archivos grandes. Solo se recomienda para sistemas dedicados a juegos.",
          type: "warning",
        },
      ],
    },
    {
      id: "find-nic-guid",
      name: "Encontrar GUID del Adaptador de Red",
      description:
        "Localiza el GUID de tu adaptador de red para la configuración del registro",
      benefit:
        "Paso requerido para aplicar optimizaciones del algoritmo de Nagle a la NIC correcta",
      impactLevel: "low" as const,
      subsections: [
        {
          title: "Obtener GUID del Adaptador de Red",
          content:
            "Este comando lista todos los adaptadores de red y sus GUIDs. Encuentra tu adaptador de red activo para juegos.",
          command: "Get-NetAdapter | Select-Object Name, InterfaceGuid",
          language: "powershell",
        },
        {
          title: "Ruta del Registro",
          content:
            "Ubicación del registro para configuración de red: HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Services\\Tcpip\\Parameters\\Interfaces\\{NIC-GUID}",
          type: "info",
        },
      ],
    },
    {
      id: "tcp-ack-frequency",
      name: "Configurar TcpAckFrequency",
      description:
        "Desactiva el retraso de reconocimiento TCP para reducir la latencia",
      benefit:
        "Configuración principal para optimización del algoritmo de Nagle",
      impactLevel: "high" as const,
      subsections: [
        {
          title: "Establecer TcpAckFrequency a 1",
          content:
            "Valor por defecto: 2 (introduce ~200ms de retraso a través del algoritmo de Nagle)\nRecomendado: 1 (desactiva el buffering de Nagle)\n\nReemplaza {NIC-GUID} con el GUID de tu adaptador del paso anterior.",
          command:
            '$nicPath = "HKLM:\\SYSTEM\\CurrentControlSet\\Services\\Tcpip\\Parameters\\Interfaces\\{NIC-GUID}"\nNew-ItemProperty -Path $nicPath -Name "TcpAckFrequency" -PropertyType DWord -Value 1 -Force',
          language: "powershell",
        },
        {
          title: "Importante",
          content:
            "Reemplaza {NIC-GUID} con el GUID real de tu adaptador de red. Obtenlo del paso anterior.",
          type: "warning",
        },
      ],
    },
    {
      id: "tcp-no-delay",
      name: "Habilitar TCPNoDelay",
      description: "Desactiva el algoritmo TCP Nagle a nivel de protocolo",
      benefit: "Asegura transmisión inmediata de paquetes sin buffering",
      impactLevel: "high" as const,
      subsections: [
        {
          title: "Establecer TCPNoDelay a 1",
          content:
            "TCPNoDelay desactiva el algoritmo de Nagle completamente. Valor 1 = Habilitado (desactiva Nagle).\n\nReemplaza {NIC-GUID} con el GUID de tu adaptador.",
          command:
            '$nicPath = "HKLM:\\SYSTEM\\CurrentControlSet\\Services\\Tcpip\\Parameters\\Interfaces\\{NIC-GUID}"\nNew-ItemProperty -Path $nicPath -Name "TCPNoDelay" -PropertyType DWord -Value 1 -Force',
          language: "powershell",
        },
      ],
    },
    {
      id: "tcp-del-ack-ticks",
      name: "Configurar TcpDelAckTicks (Opcional)",
      description: "Ajusta el tiempo de reconocimiento TCP retrasado",
      benefit:
        "Reduce aún más el retraso de reconocimiento para latencia ultra-baja",
      impactLevel: "medium" as const,
      subsections: [
        {
          title: "Establecer TcpDelAckTicks a 0",
          content:
            "TcpDelAckTicks controla el número de reconocimientos retrasados. Establecer a 0 significa sin retraso.\n\nReemplaza {NIC-GUID} con el GUID de tu adaptador.",
          command:
            '$nicPath = "HKLM:\\SYSTEM\\CurrentControlSet\\Services\\Tcpip\\Parameters\\Interfaces\\{NIC-GUID}"\nNew-ItemProperty -Path $nicPath -Name "TcpDelAckTicks" -PropertyType DWord -Value 0 -Force',
          language: "powershell",
        },
        {
          title: "Nota",
          content:
            "Esta configuración es opcional pero recomendada para reducción máxima de latencia en juegos competitivos.",
          type: "info",
        },
      ],
    },
    {
      id: "msmq-tcp-no-delay",
      name: "Habilitar TCPNoDelay para MSMQ",
      description: "Aplica TCPNoDelay a Message Queuing si usas MSMQ",
      benefit: "Asegura que MSMQ use comunicación TCP de baja latencia",
      impactLevel: "low" as const,
      subsections: [
        {
          title: "Establecer MSMQ TCPNoDelay",
          content:
            "Si usas MSMQ (Message Queuing), aplica la configuración TCPNoDelay a nivel de MSMQ.",
          command:
            '$msmqPath = "HKLM:\\SOFTWARE\\Microsoft\\MSMQ\\Parameters"\nNew-ItemProperty -Path $msmqPath -Name "TCPNoDelay" -PropertyType DWord -Value 1 -Force',
          language: "powershell",
        },
        {
          title: "Cuándo Usar",
          content:
            "Solo aplica si usas MSMQ para mensajería empresarial. Omite si no usas MSMQ.",
          type: "info",
        },
      ],
    },
    {
      id: "verify-settings",
      name: "Verificar Configuración de Nagle",
      description:
        "Verifica que tus configuraciones del algoritmo de Nagle se aplicaron correctamente",
      benefit: "Confirma que los cambios de configuración tuvieron efecto",
      impactLevel: "low" as const,
      subsections: [
        {
          title: "Verificar Valores del Registro",
          content:
            "Después de aplicar la configuración, verifica que aparezcan en el registro. Reemplaza {NIC-GUID} con tu GUID de adaptador.",
          command:
            'Get-ItemProperty -Path "HKLM:\\SYSTEM\\CurrentControlSet\\Services\\Tcpip\\Parameters\\Interfaces\\{NIC-GUID}" | Select-Object TcpAckFrequency, TCPNoDelay, TcpDelAckTicks',
          language: "powershell",
        },
        {
          title: "Valores Esperados",
          content: "TcpAckFrequency: 1\nTCPNoDelay: 1\nTcpDelAckTicks: 0",
          type: "info",
        },
      ],
    },
    {
      id: "revert-changes",
      name: "Revertir Cambios de Nagle",
      description:
        "Elimina las modificaciones del algoritmo de Nagle para volver a los valores por defecto",
      benefit: "Permite revertir la configuración si causa problemas",
      impactLevel: "medium" as const,
      subsections: [
        {
          title: "Eliminar Configuración de Nagle",
          content:
            "Esto elimina las tres configuraciones principales de Nagle del registro. Reemplaza {NIC-GUID} con tu GUID de adaptador.",
          command:
            '$nicPath = "HKLM:\\SYSTEM\\CurrentControlSet\\Services\\Tcpip\\Parameters\\Interfaces\\{NIC-GUID}"\nRemove-ItemProperty -Path $nicPath -Name "TcpAckFrequency" -ErrorAction SilentlyContinue\nRemove-ItemProperty -Path $nicPath -Name "TCPNoDelay" -ErrorAction SilentlyContinue\nRemove-ItemProperty -Path $nicPath -Name "TcpDelAckTicks" -ErrorAction SilentlyContinue',
          language: "powershell",
        },
        {
          title: "Después de Revertir",
          content:
            "Reinicia Windows para que los cambios tengan efecto. Esto restaurará el comportamiento del algoritmo de Nagle por defecto.",
          type: "info",
        },
      ],
    },
    {
      id: "nagle-best-practices",
      name: "Mejores Prácticas del Algoritmo de Nagle",
      description:
        "Directrices importantes para aplicar de forma segura las optimizaciones de Nagle",
      benefit: "Previene problemas y asegura configuración óptima",
      impactLevel: "high" as const,
      subsections: [
        {
          title: "Antes de Hacer Cambios",
          content:
            "1. Crea un punto de restauración del sistema\n2. Ejecuta PowerShell como Administrador\n3. Anota tu GUID de NIC antes de hacer cambios\n4. Prueba en una red no crítica primero\n5. Reinicia Windows después de aplicar",
          type: "warning",
        },
        {
          title: "Compatibilidad",
          content:
            "Funciona en Windows 7, 8, 10 y 11. También mejora ligeramente el rendimiento de WiFi.",
          type: "info",
        },
        {
          title: "Cuándo Usar",
          content:
            "Recomendado para: Juegos, MMOs, juegos FPS, aplicaciones en tiempo real\nNo recomendado para: Sistemas de transferencia de archivos pesada, servidores de propósito general",
          type: "info",
        },
      ],
    },
  ] as Tweak[],
};
