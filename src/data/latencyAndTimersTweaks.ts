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

export const latencyAndTimersTweaks = {
  en: [
    {
      id: "latency-timers-overview",
      name: "Understanding Latency and Timers",
      description:
        "Learn about system latency factors: interrupts, DPC, timers, and message handling",
      benefit:
        "Understanding latency sources helps identify optimization opportunities",
      impactLevel: "low" as const,
      subsections: [
        {
          title: "System Latency Sources",
          content:
            "System latency comes from multiple sources:\n- Interrupt processing (IRQ/DPC)\n- Windows timer resolution (15.625ms default)\n- High Precision Event Timer (HPET) overhead\n- Windows message queue processing\n\nEach can be optimized for lower latency gaming.",
          type: "info",
        },
        {
          title: "Latency Impact on Gaming",
          content:
            "Lower latency means:\n- Faster mouse/input response\n- Lower ping in multiplayer games\n- Reduced frame timing jitter\n- Better competitive gaming performance",
          type: "info",
        },
      ],
    },
    {
      id: "disable-dynamic-tick",
      name: "Disable Dynamic Tick",
      description:
        "Configure interrupt priority and disable dynamic tick for consistent timing",
      benefit:
        "Ensures consistent interrupt processing and reduces timing variations",
      impactLevel: "high" as const,
      subsections: [
        {
          title: "Disable Dynamic Tick",
          content:
            "DisableDynamicTick forces Windows to use fixed 15.625ms timer instead of dynamic adjustment. This provides more consistent timing for gaming.",
          command:
            '$path = "HKLM:\\SYSTEM\\CurrentControlSet\\Control\\KernelVelocity"\nNew-Item -Path $path -Force | Out-Null\nNew-ItemProperty -Path $path -Name "DisableDynamicTick" -PropertyType DWord -Value 1 -Force',
          language: "powershell",
        },
        {
          title: "Important",
          content:
            "Requires administrator privileges and Windows restart. Helps consistency in frame timing.",
          type: "warning",
        },
      ],
    },
    {
      id: "configure-dpc-watchdog",
      name: "Configure DPC Watchdog",
      description: "Adjust DPC watchdog profile for lower latency",
      benefit: "Prevents DPC timeout issues and improves interrupt response",
      impactLevel: "medium" as const,
      subsections: [
        {
          title: "Set DPC Watchdog Offset",
          content:
            "DPC (Deferred Procedure Call) Watchdog monitors interrupt processing time. Increasing the offset prevents watchdog timeouts.",
          command:
            '$path = "HKLM:\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\kernel"\nNew-ItemProperty -Path $path -Name "DpcWatchdogProfileOffset" -PropertyType DWord -Value 10000 -Force',
          language: "powershell",
        },
        {
          title: "Value Meaning",
          content:
            "10000 (0x2710) allows up to 10 microseconds for DPC processing before timeout.",
          type: "info",
        },
      ],
    },
    {
      id: "set-timer-resolution-low",
      name: "Set Low Timer Resolution",
      description:
        "Reduce Windows timer resolution from 15.625ms to 1ms or 0.5ms",
      benefit:
        "Dramatically improves input responsiveness and frame consistency",
      impactLevel: "high" as const,
      subsections: [
        {
          title: "Understanding Timer Resolution",
          content:
            "Default Windows timer resolution: 15.625ms (64 Hz)\nGaming optimal: 1ms (1000 Hz)\nAggressive: 0.5ms (2000 Hz)\n\nLower timer resolution = more frequent timer interrupts = lower latency",
          type: "info",
        },
        {
          title: "Set Timer Resolution to 0.5ms",
          content:
            "Use bcdedit commands to set timer resolution to 0.5ms, the most aggressive gaming optimization.",
          command:
            "bcdedit /set disabledynamictick yes\nbcdedit /set useplatformclock true",
          language: "powershell",
        },
        {
          title: "Important",
          content:
            "These bcdedit commands require administrator privileges and Windows restart.",
          type: "warning",
        },
      ],
    },
    {
      id: "timer-resolution-tools",
      name: "Timer Resolution Tools",
      description:
        "Use third-party tools to adjust timer resolution in real-time",
      benefit: "Allows dynamic timer adjustment without system restart",
      impactLevel: "medium" as const,
      subsections: [
        {
          title: "Recommended Tools",
          content:
            "- TimerResolution by Lucas Hale: GUI tool for real-time timer adjustment\n- HPET Utility: Direct hardware timer access\n\nThese tools bypass the 15ms default and work immediately without reboot.",
          type: "info",
        },
        {
          title: "Using TimerResolution",
          content:
            "Download TimerResolution, set to 0.5ms or 1ms, and it immediately takes effect. Recommended for testing before permanent bcdedit changes.",
          type: "info",
        },
      ],
    },
    {
      id: "disable-hpet",
      name: "Disable HPET",
      description:
        "Disable High Precision Event Timer which can introduce latency",
      benefit: "On most modern systems, HPET adds latency rather than helping",
      impactLevel: "high" as const,
      subsections: [
        {
          title: "Disable HPET via Boot Configuration",
          content:
            "Remove useplatformclock setting to disable HPET (High Precision Event Timer) at the firmware level.",
          command: "bcdedit /deletevalue useplatformclock",
          language: "powershell",
        },
        {
          title: "Alternative: Disable via Device Manager",
          content:
            "Disable the High Precision Event Timer device in Device Manager as an alternative method.",
          command:
            'Get-PnpDevice | Where-Object {$_.FriendlyName -like "*High Precision Event Timer*"} | Disable-PnpDevice -Confirm:$false',
          language: "powershell",
        },
        {
          title: "Compatibility Warning",
          content:
            "On very old systems or notebooks, HPET may be necessary. Test stability after disabling before making permanent.",
          type: "warning",
        },
      ],
    },
    {
      id: "configure-message-priority",
      name: "Configure Windows Message Priority",
      description:
        "Reduce Windows message queue latency with Win32PrioritySeparation",
      benefit:
        "Improves window message processing speed for faster input response",
      impactLevel: "medium" as const,
      subsections: [
        {
          title: "Set Win32PrioritySeparation for Gaming",
          content:
            "Win32PrioritySeparation controls foreground vs background process priority. Value 38 (0x26) is optimal for gaming.",
          command:
            'New-ItemProperty -Path "HKLM:\\SYSTEM\\CurrentControlSet\\Control\\PriorityControl" -Name "Win32PrioritySeparation" -PropertyType DWord -Value 38 -Force',
          language: "powershell",
        },
        {
          title: "Common Values",
          content:
            "26 (0x1A): Balanced\n38 (0x26): Gaming (increased foreground priority) - Recommended\n40 (0x28): Maximum foreground priority (aggressive)",
          type: "info",
        },
      ],
    },
    {
      id: "configure-irq-priority",
      name: "Configure IRQ Priority",
      description: "Set high priority for network and GPU interrupt handling",
      benefit: "Ensures network and GPU interrupts are handled quickly",
      impactLevel: "medium" as const,
      subsections: [
        {
          title: "Set IRQ Priorities",
          content:
            "IRQ8 typically handles system timers, IRQ16 handles PCI-E devices like network and GPU. Set high priority for gaming devices.",
          command:
            '$path = "HKLM:\\SYSTEM\\CurrentControlSet\\Control\\PriorityControl"\nNew-ItemProperty -Path $path -Name "IRQ8Priority" -PropertyType DWord -Value 1 -Force\nNew-ItemProperty -Path $path -Name "IRQ16Priority" -PropertyType DWord -Value 2 -Force',
          language: "powershell",
        },
        {
          title: "Priority Values",
          content:
            "Higher values = higher priority. Value 1-2 is safe range for gaming optimization.",
          type: "info",
        },
      ],
    },
    {
      id: "enable-msi-mode",
      name: "Enable MSI Mode",
      description: "Enable Message Signaled Interrupts for PCIe devices",
      benefit:
        "Reduces latency by using message-based instead of pin-based interrupts",
      impactLevel: "medium" as const,
      subsections: [
        {
          title: "What is MSI?",
          content:
            "Message Signaled Interrupts (MSI) allows devices to signal interrupts via message delivery instead of dedicated interrupt pins. This reduces latency and contention.",
          type: "info",
        },
        {
          title: "Enable MSI for Gaming",
          content:
            "Use MSI Utility or registry editing to enable MSI on:\n- Network adapter\n- GPU\n- USB controller\n\nMost gaming devices benefit from MSI mode.",
          type: "info",
        },
        {
          title: "Note",
          content:
            "MSI mode is typically enabled by default on modern gaming hardware. Check Device Manager > Properties > MSI Support tab.",
          type: "info",
        },
      ],
    },
    {
      id: "verify-latency-settings",
      name: "Verify Latency Settings",
      description: "Check that all latency optimizations were applied",
      benefit: "Confirms configuration changes took effect",
      impactLevel: "low" as const,
      subsections: [
        {
          title: "Check Dynamic Tick Disabled",
          content: "Verify DisableDynamicTick is set to 1.",
          command:
            'Get-ItemProperty -Path "HKLM:\\SYSTEM\\CurrentControlSet\\Control\\KernelVelocity" -Name "DisableDynamicTick"',
          language: "powershell",
        },
        {
          title: "Check DPC Watchdog",
          content: "Verify DPC Watchdog profile offset is set.",
          command:
            'Get-ItemProperty -Path "HKLM:\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\kernel" -Name "DpcWatchdogProfileOffset"',
          language: "powershell",
        },
        {
          title: "Check Timer Resolution",
          content:
            "Verify bcdedit timer settings are applied. Check in System Information for Timer Resolution.",
          command: "bcdedit /enum | findstr /i timer",
          language: "powershell",
        },
      ],
    },
    {
      id: "complete-latency-optimization",
      name: "Complete Latency Optimization",
      description: "Apply all latency and timer optimizations at once",
      benefit: "Comprehensive latency reduction in one script",
      impactLevel: "high" as const,
      subsections: [
        {
          title: "Complete Optimization Script",
          content:
            "This script applies all recommended latency and timer optimizations.",
          command:
            '# Disable Dynamic Tick\n$path = "HKLM:\\SYSTEM\\CurrentControlSet\\Control\\KernelVelocity"\nNew-Item -Path $path -Force | Out-Null\nNew-ItemProperty -Path $path -Name "DisableDynamicTick" -PropertyType DWord -Value 1 -Force\n\n# Configure DPC Watchdog\n$path = "HKLM:\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\kernel"\nNew-ItemProperty -Path $path -Name "DpcWatchdogProfileOffset" -PropertyType DWord -Value 10000 -Force\n\n# Configure Win32PrioritySeparation for Gaming\nNew-ItemProperty -Path "HKLM:\\SYSTEM\\CurrentControlSet\\Control\\PriorityControl" -Name "Win32PrioritySeparation" -PropertyType DWord -Value 38 -Force\n\n# Configure IRQ Priorities\n$path = "HKLM:\\SYSTEM\\CurrentControlSet\\Control\\PriorityControl"\nNew-ItemProperty -Path $path -Name "IRQ8Priority" -PropertyType DWord -Value 1 -Force\nNew-ItemProperty -Path $path -Name "IRQ16Priority" -PropertyType DWord -Value 2 -Force\n\n# Set Timer Resolution via bcdedit\nbcdedit /set disabledynamictick yes\nbcdedit /set useplatformclock true\n\nWrite-Host "All latency optimizations applied. Please restart Windows."',
          language: "powershell",
        },
        {
          title: "After Running Script",
          content: "Restart Windows for all changes to take effect properly.",
          type: "warning",
        },
      ],
    },
    {
      id: "latency-best-practices",
      name: "Latency and Timers Best Practices",
      description: "Important guidelines for applying latency optimizations",
      benefit: "Prevents issues and ensures optimal configuration",
      impactLevel: "high" as const,
      subsections: [
        {
          title: "Before Making Changes",
          content:
            "1. Create a system restore point\n2. Run PowerShell as Administrator\n3. Test in safe mode first if concerned about stability\n4. Have driver CDs/downloads ready for GPU and network\n5. Note all original settings before changes",
          type: "warning",
        },
        {
          title: "System Restart Required",
          content:
            "All these changes require a complete system restart to take effect. Plan accordingly.",
          type: "warning",
        },
        {
          title: "Compatibility Notes",
          content:
            "- Works on Windows 7, 8, 10, and 11\n- Some very old systems may need HPET enabled\n- Virtual machines may not support all changes\n- Some settings require specific hardware support",
          type: "info",
        },
        {
          title: "Testing Results",
          content:
            "Expected improvements: Reduced input latency (5-10ms typical), lower frame time consistency, better ping stability. Results vary by hardware and game.",
          type: "info",
        },
      ],
    },
  ] as Tweak[],
  es: [
    {
      id: "latency-timers-overview",
      name: "Entendiendo Latencia y Timers",
      description:
        "Aprende sobre factores de latencia del sistema: interrupciones, DPC, timers y manejo de mensajes",
      benefit:
        "Entender las fuentes de latencia ayuda a identificar oportunidades de optimización",
      impactLevel: "low" as const,
      subsections: [
        {
          title: "Fuentes de Latencia del Sistema",
          content:
            "La latencia del sistema viene de múltiples fuentes:\n- Procesamiento de interrupciones (IRQ/DPC)\n- Resolución de timer de Windows (15.625ms por defecto)\n- Overhead de High Precision Event Timer (HPET)\n- Procesamiento de cola de mensajes de Windows\n\nCada uno puede ser optimizado para gaming de baja latencia.",
          type: "info",
        },
        {
          title: "Impacto de Latencia en Gaming",
          content:
            "Menor latencia significa:\n- Respuesta más rápida de mouse/entrada\n- Ping más bajo en juegos multijugador\n- Menos jitter de tiempos de frame\n- Mejor rendimiento en gaming competitivo",
          type: "info",
        },
      ],
    },
    {
      id: "disable-dynamic-tick",
      name: "Desactivar Dynamic Tick",
      description:
        "Configura prioridad de interrupciones y desactiva dynamic tick para timing consistente",
      benefit:
        "Asegura procesamiento consistente de interrupciones y reduce variaciones de timing",
      impactLevel: "high" as const,
      subsections: [
        {
          title: "Desactivar Dynamic Tick",
          content:
            "DisableDynamicTick fuerza a Windows a usar timer fijo de 15.625ms en lugar de ajuste dinámico. Esto proporciona timing más consistente para gaming.",
          command:
            '$path = "HKLM:\\SYSTEM\\CurrentControlSet\\Control\\KernelVelocity"\nNew-Item -Path $path -Force | Out-Null\nNew-ItemProperty -Path $path -Name "DisableDynamicTick" -PropertyType DWord -Value 1 -Force',
          language: "powershell",
        },
        {
          title: "Importante",
          content:
            "Requiere privilegios de administrador y reinicio de Windows. Ayuda a consistencia en frame timing.",
          type: "warning",
        },
      ],
    },
    {
      id: "configure-dpc-watchdog",
      name: "Configurar DPC Watchdog",
      description: "Ajusta el perfil del watchdog de DPC para menor latencia",
      benefit:
        "Previene problemas de timeout de DPC y mejora respuesta de interrupciones",
      impactLevel: "medium" as const,
      subsections: [
        {
          title: "Establecer DPC Watchdog Offset",
          content:
            "DPC (Deferred Procedure Call) Watchdog monitorea el tiempo de procesamiento de interrupciones. Aumentar el offset previene timeouts del watchdog.",
          command:
            '$path = "HKLM:\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\kernel"\nNew-ItemProperty -Path $path -Name "DpcWatchdogProfileOffset" -PropertyType DWord -Value 10000 -Force',
          language: "powershell",
        },
        {
          title: "Significado del Valor",
          content:
            "10000 (0x2710) permite hasta 10 microsegundos para procesamiento de DPC antes de timeout.",
          type: "info",
        },
      ],
    },
    {
      id: "set-timer-resolution-low",
      name: "Establecer Baja Resolución de Timer",
      description:
        "Reduce la resolución de timer de Windows de 15.625ms a 1ms o 0.5ms",
      benefit:
        "Mejora dramáticamente la responsividad de entrada y consistencia de frames",
      impactLevel: "high" as const,
      subsections: [
        {
          title: "Entendiendo Resolución de Timer",
          content:
            "Resolución de timer por defecto de Windows: 15.625ms (64 Hz)\nÓptimo para gaming: 1ms (1000 Hz)\nAgresivo: 0.5ms (2000 Hz)\n\nMenor resolución de timer = más interrupciones frecuentes = menor latencia",
          type: "info",
        },
        {
          title: "Establecer Resolución de Timer a 0.5ms",
          content:
            "Usa comandos bcdedit para establecer resolución de timer a 0.5ms, la optimización de gaming más agresiva.",
          command:
            "bcdedit /set disabledynamictick yes\nbcdedit /set useplatformclock true",
          language: "powershell",
        },
        {
          title: "Importante",
          content:
            "Estos comandos bcdedit requieren privilegios de administrador y reinicio de Windows.",
          type: "warning",
        },
      ],
    },
    {
      id: "timer-resolution-tools",
      name: "Herramientas de Resolución de Timer",
      description:
        "Usa herramientas de terceros para ajustar resolución de timer en tiempo real",
      benefit: "Permite ajuste dinámico de timer sin reinicio del sistema",
      impactLevel: "medium" as const,
      subsections: [
        {
          title: "Herramientas Recomendadas",
          content:
            "- TimerResolution de Lucas Hale: Herramienta GUI para ajuste de timer en tiempo real\n- HPET Utility: Acceso directo a hardware de timer\n\nEstas herramientas evitan el defecto de 15ms y funcionan inmediatamente sin reinicio.",
          type: "info",
        },
        {
          title: "Usando TimerResolution",
          content:
            "Descarga TimerResolution, establece a 0.5ms o 1ms, y toma efecto inmediatamente. Recomendado para pruebas antes de cambios permanentes de bcdedit.",
          type: "info",
        },
      ],
    },
    {
      id: "disable-hpet",
      name: "Desactivar HPET",
      description:
        "Desactiva High Precision Event Timer que puede introducir latencia",
      benefit:
        "En la mayoría de sistemas modernos, HPET añade latencia en lugar de ayudar",
      impactLevel: "high" as const,
      subsections: [
        {
          title: "Desactivar HPET vía Configuración de Arranque",
          content:
            "Elimina la configuración useplatformclock para desactivar HPET (High Precision Event Timer) a nivel de firmware.",
          command: "bcdedit /deletevalue useplatformclock",
          language: "powershell",
        },
        {
          title: "Alternativa: Desactivar vía Device Manager",
          content:
            "Desactiva el dispositivo High Precision Event Timer en Device Manager como método alternativo.",
          command:
            'Get-PnpDevice | Where-Object {$_.FriendlyName -like "*High Precision Event Timer*"} | Disable-PnpDevice -Confirm:$false',
          language: "powershell",
        },
        {
          title: "Advertencia de Compatibilidad",
          content:
            "En sistemas muy antiguos o notebooks, HPET puede ser necesario. Prueba estabilidad después de desactivar antes de hacer permanente.",
          type: "warning",
        },
      ],
    },
    {
      id: "configure-message-priority",
      name: "Configurar Prioridad de Mensajes de Windows",
      description:
        "Reduce latencia de cola de mensajes de Windows con Win32PrioritySeparation",
      benefit:
        "Mejora velocidad de procesamiento de mensajes de ventana para respuesta más rápida de entrada",
      impactLevel: "medium" as const,
      subsections: [
        {
          title: "Establecer Win32PrioritySeparation para Gaming",
          content:
            "Win32PrioritySeparation controla la prioridad de procesos en primer plano vs segundo plano. Valor 38 (0x26) es óptimo para gaming.",
          command:
            'New-ItemProperty -Path "HKLM:\\SYSTEM\\CurrentControlSet\\Control\\PriorityControl" -Name "Win32PrioritySeparation" -PropertyType DWord -Value 38 -Force',
          language: "powershell",
        },
        {
          title: "Valores Comunes",
          content:
            "26 (0x1A): Balanceado\n38 (0x26): Gaming (prioridad de primer plano aumentada) - Recomendado\n40 (0x28): Máxima prioridad de primer plano (agresivo)",
          type: "info",
        },
      ],
    },
    {
      id: "configure-irq-priority",
      name: "Configurar Prioridad de IRQ",
      description:
        "Establece alta prioridad para manejo de interrupciones de red y GPU",
      benefit:
        "Asegura que interrupciones de red y GPU sean manejadas rápidamente",
      impactLevel: "medium" as const,
      subsections: [
        {
          title: "Establecer Prioridades de IRQ",
          content:
            "IRQ8 típicamente maneja timers del sistema, IRQ16 maneja dispositivos PCI-E como red y GPU. Establece alta prioridad para dispositivos de gaming.",
          command:
            '$path = "HKLM:\\SYSTEM\\CurrentControlSet\\Control\\PriorityControl"\nNew-ItemProperty -Path $path -Name "IRQ8Priority" -PropertyType DWord -Value 1 -Force\nNew-ItemProperty -Path $path -Name "IRQ16Priority" -PropertyType DWord -Value 2 -Force',
          language: "powershell",
        },
        {
          title: "Valores de Prioridad",
          content:
            "Valores más altos = mayor prioridad. Valor 1-2 es rango seguro para optimización de gaming.",
          type: "info",
        },
      ],
    },
    {
      id: "enable-msi-mode",
      name: "Habilitar Modo MSI",
      description:
        "Habilita Message Signaled Interrupts para dispositivos PCIe",
      benefit:
        "Reduce latencia usando interrupciones basadas en mensaje en lugar de basadas en pin",
      impactLevel: "medium" as const,
      subsections: [
        {
          title: "¿Qué es MSI?",
          content:
            "Message Signaled Interrupts (MSI) permite a dispositivos señalar interrupciones vía entrega de mensaje en lugar de pines de interrupción dedicados. Esto reduce latencia y contención.",
          type: "info",
        },
        {
          title: "Habilitar MSI para Gaming",
          content:
            "Usa MSI Utility o edición de registro para habilitar MSI en:\n- Adaptador de red\n- GPU\n- Controlador USB\n\nLa mayoría de dispositivos de gaming se benefician del modo MSI.",
          type: "info",
        },
        {
          title: "Nota",
          content:
            "El modo MSI está típicamente habilitado por defecto en hardware de gaming moderno. Verifica Device Manager > Properties > MSI Support tab.",
          type: "info",
        },
      ],
    },
    {
      id: "verify-latency-settings",
      name: "Verificar Configuración de Latencia",
      description:
        "Verifica que todas las optimizaciones de latencia fueron aplicadas",
      benefit: "Confirma que los cambios de configuración tuvieron efecto",
      impactLevel: "low" as const,
      subsections: [
        {
          title: "Verificar Dynamic Tick Desactivado",
          content: "Verifica que DisableDynamicTick esté establecido a 1.",
          command:
            'Get-ItemProperty -Path "HKLM:\\SYSTEM\\CurrentControlSet\\Control\\KernelVelocity" -Name "DisableDynamicTick"',
          language: "powershell",
        },
        {
          title: "Verificar DPC Watchdog",
          content:
            "Verifica que el offset del perfil de DPC Watchdog esté establecido.",
          command:
            'Get-ItemProperty -Path "HKLM:\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\kernel" -Name "DpcWatchdogProfileOffset"',
          language: "powershell",
        },
        {
          title: "Verificar Resolución de Timer",
          content:
            "Verifica que la configuración de timer de bcdedit esté aplicada. Verifica en System Information para Timer Resolution.",
          command: "bcdedit /enum | findstr /i timer",
          language: "powershell",
        },
      ],
    },
    {
      id: "complete-latency-optimization",
      name: "Optimización Completa de Latencia",
      description:
        "Aplica todas las optimizaciones de latencia y timer de una vez",
      benefit: "Reducción integral de latencia en un script",
      impactLevel: "high" as const,
      subsections: [
        {
          title: "Script Completo de Optimización",
          content:
            "Este script aplica todas las optimizaciones recomendadas de latencia y timer.",
          command:
            '# Desactivar Dynamic Tick\n$path = "HKLM:\\SYSTEM\\CurrentControlSet\\Control\\KernelVelocity"\nNew-Item -Path $path -Force | Out-Null\nNew-ItemProperty -Path $path -Name "DisableDynamicTick" -PropertyType DWord -Value 1 -Force\n\n# Configurar DPC Watchdog\n$path = "HKLM:\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\kernel"\nNew-ItemProperty -Path $path -Name "DpcWatchdogProfileOffset" -PropertyType DWord -Value 10000 -Force\n\n# Configurar Win32PrioritySeparation para Gaming\nNew-ItemProperty -Path "HKLM:\\SYSTEM\\CurrentControlSet\\Control\\PriorityControl" -Name "Win32PrioritySeparation" -PropertyType DWord -Value 38 -Force\n\n# Configurar Prioridades de IRQ\n$path = "HKLM:\\SYSTEM\\CurrentControlSet\\Control\\PriorityControl"\nNew-ItemProperty -Path $path -Name "IRQ8Priority" -PropertyType DWord -Value 1 -Force\nNew-ItemProperty -Path $path -Name "IRQ16Priority" -PropertyType DWord -Value 2 -Force\n\n# Establecer Resolución de Timer vía bcdedit\nbcdedit /set disabledynamictick yes\nbcdedit /set useplatformclock true\n\nWrite-Host "Todas las optimizaciones de latencia han sido aplicadas. Por favor reinicia Windows."',
          language: "powershell",
        },
        {
          title: "Después de Ejecutar el Script",
          content:
            "Reinicia Windows para que todos los cambios tomen efecto apropiadamente.",
          type: "warning",
        },
      ],
    },
    {
      id: "latency-best-practices",
      name: "Mejores Prácticas de Latencia y Timers",
      description:
        "Directrices importantes para aplicar optimizaciones de latencia",
      benefit: "Previene problemas y asegura configuración óptima",
      impactLevel: "high" as const,
      subsections: [
        {
          title: "Antes de Hacer Cambios",
          content:
            "1. Crea un punto de restauración del sistema\n2. Ejecuta PowerShell como Administrador\n3. Prueba en modo seguro primero si te preocupa la estabilidad\n4. Ten CDs/descargas de drivers listos para GPU y red\n5. Anota todas las configuraciones originales antes de cambios",
          type: "warning",
        },
        {
          title: "Reinicio del Sistema Requerido",
          content:
            "Todos estos cambios requieren un reinicio completo del sistema para tomar efecto. Planifica en consecuencia.",
          type: "warning",
        },
        {
          title: "Notas de Compatibilidad",
          content:
            "- Funciona en Windows 7, 8, 10 y 11\n- Algunos sistemas muy antiguos pueden necesitar HPET habilitado\n- Las máquinas virtuales pueden no soportar todos los cambios\n- Algunas configuraciones requieren soporte de hardware específico",
          type: "info",
        },
        {
          title: "Resultados de Pruebas",
          content:
            "Mejoras esperadas: Latencia de entrada reducida (típico 5-10ms), menor consistencia de tiempo de frame, mejor estabilidad de ping. Los resultados varían según hardware y juego.",
          type: "info",
        },
      ],
    },
  ] as Tweak[],
};
