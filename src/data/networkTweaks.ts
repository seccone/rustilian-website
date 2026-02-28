export const networkTweaks = {
  es: [
    {
      id: "congestion-provider",
      name: "🎯 Congestion Provider",
      description:
        "Controla cómo tu conexión se recupera de congestión, pérdida de paquetes y aumento de latencia.",
      benefit: "Reduce latencia y mejora la estabilidad de conexión",
      impact: "high",
      subsections: [
        {
          title: "Proveedor Recomendado",
          content:
            "CTCP es el mejor para gaming, CUBIC para throughput puro, New-Reno como alternativa clásica",
        },
        {
          title: "Ver proveedor actual",
          command:
            "Get-NetTCPSetting | Select-Object SettingName, CongestionProvider",
          language: "powershell",
        },
        {
          title: "Cambiar a CTCP (recomendado para gaming)",
          command:
            "netsh int tcp set supplemental internet congestionprovider=ctcp",
          language: "powershell",
        },
        {
          title: "Cambiar a NEWRENO",
          command:
            "netsh int tcp set supplemental internet congestionprovider=newreno",
          language: "powershell",
        },
      ],
    },
    {
      id: "ecn",
      name: "⚡ ECN (Explicit Congestion Notification)",
      description:
        "Permite a los routers señalar congestión sin descartar paquetes, reduciendo retransmisiones.",
      benefit: "Reduce retransmisiones de paquetes en redes congestionadas",
      impact: "medium",
      subsections: [
        {
          title: "Habilitar ECN",
          command: "netsh int tcp set global ecncapability=enabled",
          language: "powershell",
        },
        {
          title: "Cuándo usar ECN",
          content:
            "Habilita ECN solo si tu router lo soporta y tienes pérdida de paquetes. Funciona mejor con conexiones interactivas y gaming en presencia de congestión.",
        },
      ],
    },
    {
      id: "autotuning",
      name: "🚀 AutoTuning",
      description:
        "Ajusta automáticamente el tamaño del buffer de recepción para optimizar el throughput.",
      benefit: "Optimiza automáticamente el rendimiento de la conexión",
      impact: "medium",
      subsections: [
        {
          title: "Configurar AutoTuning Experimental",
          command: "netsh int tcp set global autotuninglevel=experimental",
          language: "powershell",
        },
        {
          title: "Valores posibles",
          content:
            "disabled (desactivado), normal (por defecto), experimental (máximo rendimiento)",
        },
      ],
    },
    {
      id: "rsc",
      name: "📡 RSC (Receive Segment Coalescing)",
      description:
        "Combina múltiples paquetes TCP/IP en uno solo para reducir overhead de CPU, pero puede aumentar latencia.",
      benefit: "Reduce overhead de CPU",
      impact: "high",
      subsections: [
        {
          title: "Deshabilitar RSC (recomendado para gaming)",
          command: "netsh int tcp set global rsc=disabled",
          language: "powershell",
        },
        {
          title: "Para Gaming",
          content:
            "Desactiva RSC si priorizas latencia sobre throughput. RSC reduce uso de CPU pero puede añadir latencia.",
        },
      ],
    },
    {
      id: "lso",
      name: "📤 LSO (Large Send Offload)",
      description:
        "Permite que el adaptador de red complete la segmentación de datos en lugar del sistema operativo.",
      benefit: "Reduce carga del CPU",
      impact: "medium",
      subsections: [
        {
          title: "Deshabilitar LSO (recomendado para gaming)",
          command: "Disable-NetAdapterLso -Name *",
          language: "powershell",
        },
        {
          title: "Ver estado de LSO",
          command: "Get-NetAdapterLso -Name *",
          language: "powershell",
        },
      ],
    },
    {
      id: "rss",
      name: "🔄 RSS (Receive-Side Scaling)",
      description:
        "Distribuye el procesamiento de red entre múltiples núcleos de CPU.",
      benefit: "Distribuye carga de red entre múltiples núcleos",
      impact: "low",
      subsections: [
        {
          title: "Deshabilitar RSS (solo si CPU al 100%)",
          command: "netsh int tcp set global rss=disabled",
          language: "powershell",
        },
        {
          title: "Cuándo deshabilitar",
          content:
            "Solo desactiva RSS si tu CPU llega al 100% durante gaming. De lo contrario, déjalo habilitado.",
        },
      ],
    },
    {
      id: "udp",
      name: "📶 UDP Offloading",
      description:
        "Optimiza el procesamiento de paquetes UDP para mejor rendimiento.",
      benefit: "Mejora el rendimiento de UDP",
      impact: "medium",
      subsections: [
        {
          title: "Habilitar UDP Offloading",
          command: "netsh int udp set global uro=enabled",
          language: "powershell",
        },
      ],
    },
    {
      id: "teredo",
      name: "🌍 Teredo y 6to4",
      description:
        "Necesarios para Xbox LIVE y algunos juegos en Windows 10/11.",
      benefit: "Habilita soporte para juegos online y Xbox LIVE",
      impact: "low",
      subsections: [
        {
          title: "Habilitar Teredo",
          command: "netsh int teredo set state natawareclient",
          language: "powershell",
        },
        {
          title: "Habilitar 6to4",
          command: "netsh int 6to4 set state state=enabled",
          language: "powershell",
        },
      ],
    },
    {
      id: "verificar",
      name: "🔍 Verificar Configuración",
      description:
        "Comprueba la configuración actual de TCP/IP y adaptadores de red.",
      benefit: "Verifica que los cambios se aplicaron correctamente",
      impact: "low",
      subsections: [
        {
          title: "Ver todas las configuraciones TCP",
          command: "netsh int tcp show global",
          language: "powershell",
        },
        {
          title: "Ver configuración de adaptador",
          command: "Get-NetAdapter | Select-Object Name, Status, LinkSpeed",
          language: "powershell",
        },
      ],
    },
  ],
  en: [
    {
      id: "congestion-provider",
      name: "🎯 Congestion Provider",
      description:
        "Controls how your connection recovers from congestion, packet loss, and increased latency.",
      benefit: "Reduces latency and improves connection stability",
      impact: "high",
      subsections: [
        {
          title: "Recommended Provider",
          content:
            "CTCP is best for gaming, CUBIC for pure throughput, New-Reno as classic alternative",
        },
        {
          title: "View current provider",
          command:
            "Get-NetTCPSetting | Select-Object SettingName, CongestionProvider",
          language: "powershell",
        },
        {
          title: "Change to CTCP (recommended for gaming)",
          command:
            "netsh int tcp set supplemental internet congestionprovider=ctcp",
          language: "powershell",
        },
        {
          title: "Change to NEWRENO",
          command:
            "netsh int tcp set supplemental internet congestionprovider=newreno",
          language: "powershell",
        },
      ],
    },
    {
      id: "ecn",
      name: "⚡ ECN (Explicit Congestion Notification)",
      description:
        "Allows routers to signal congestion without dropping packets, reducing retransmissions.",
      benefit: "Reduces packet retransmissions in congested networks",
      impact: "medium",
      subsections: [
        {
          title: "Enable ECN",
          command: "netsh int tcp set global ecncapability=enabled",
          language: "powershell",
        },
        {
          title: "When to use ECN",
          content:
            "Enable ECN only if your router supports it and you have packet loss. Works best with interactive connections and gaming under congestion.",
        },
      ],
    },
    {
      id: "autotuning",
      name: "🚀 AutoTuning",
      description:
        "Automatically adjusts the receive buffer size to optimize throughput.",
      benefit: "Automatically optimizes connection performance",
      impact: "medium",
      subsections: [
        {
          title: "Configure AutoTuning Experimental",
          command: "netsh int tcp set global autotuninglevel=experimental",
          language: "powershell",
        },
        {
          title: "Possible values",
          content:
            "disabled (disabled), normal (default), experimental (maximum performance)",
        },
      ],
    },
    {
      id: "rsc",
      name: "📡 RSC (Receive Segment Coalescing)",
      description:
        "Combines multiple TCP/IP packets into one to reduce CPU overhead, but may increase latency.",
      benefit: "Reduces CPU overhead",
      impact: "high",
      subsections: [
        {
          title: "Disable RSC (recommended for gaming)",
          command: "netsh int tcp set global rsc=disabled",
          language: "powershell",
        },
        {
          title: "For Gaming",
          content:
            "Disable RSC if you prioritize latency over throughput. RSC reduces CPU usage but can add latency.",
        },
      ],
    },
    {
      id: "lso",
      name: "📤 LSO (Large Send Offload)",
      description:
        "Allows the network adapter to complete data segmentation instead of the operating system.",
      benefit: "Reduces CPU load",
      impact: "medium",
      subsections: [
        {
          title: "Disable LSO (recommended for gaming)",
          command: "Disable-NetAdapterLso -Name *",
          language: "powershell",
        },
        {
          title: "View LSO status",
          command: "Get-NetAdapterLso -Name *",
          language: "powershell",
        },
      ],
    },
    {
      id: "rss",
      name: "🔄 RSS (Receive-Side Scaling)",
      description: "Distributes network processing across multiple CPU cores.",
      benefit: "Distributes network load across multiple cores",
      impact: "low",
      subsections: [
        {
          title: "Disable RSS (only if CPU at 100%)",
          command: "netsh int tcp set global rss=disabled",
          language: "powershell",
        },
        {
          title: "When to disable",
          content:
            "Only disable RSS if your CPU reaches 100% during gaming. Otherwise, leave it enabled.",
        },
      ],
    },
    {
      id: "udp",
      name: "📶 UDP Offloading",
      description: "Optimizes UDP packet processing for better performance.",
      benefit: "Improves UDP performance",
      impact: "medium",
      subsections: [
        {
          title: "Enable UDP Offloading",
          command: "netsh int udp set global uro=enabled",
          language: "powershell",
        },
      ],
    },
    {
      id: "teredo",
      name: "🌍 Teredo and 6to4",
      description: "Required for Xbox LIVE and some games on Windows 10/11.",
      benefit: "Enables support for online gaming and Xbox LIVE",
      impact: "low",
      subsections: [
        {
          title: "Enable Teredo",
          command: "netsh int teredo set state natawareclient",
          language: "powershell",
        },
        {
          title: "Enable 6to4",
          command: "netsh int 6to4 set state state=enabled",
          language: "powershell",
        },
      ],
    },
    {
      id: "verificar",
      name: "🔍 Verify Configuration",
      description: "Check current TCP/IP and network adapter configuration.",
      benefit: "Verifies that changes were applied correctly",
      impact: "low",
      subsections: [
        {
          title: "View all TCP settings",
          command: "netsh int tcp show global",
          language: "powershell",
        },
        {
          title: "View adapter configuration",
          command: "Get-NetAdapter | Select-Object Name, Status, LinkSpeed",
          language: "powershell",
        },
      ],
    },
  ],
};
