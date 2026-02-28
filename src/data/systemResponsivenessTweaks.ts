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

export const systemResponsivenessTweaks = {
  en: [
    {
      id: "system-responsiveness-overview",
      name: "Understanding System Responsiveness",
      description: "Learn how MMCSS CPU reservation impacts gaming performance",
      benefit:
        "Understanding CPU reservation helps optimize gaming performance",
      impactLevel: "low" as const,
      subsections: [
        {
          title: "What is MMCSS?",
          content:
            "MMCSS (Multimedia Class Scheduler) is a Windows service that reserves 20% of CPU by default for background processes. This means gaming applications can only use up to 80% of your CPU, even if more is available. Reducing this reservation gives more CPU power to games.",
          type: "info",
        },
        {
          title: "SystemResponsiveness Values",
          content:
            "Default: 20 (20% CPU reserved for background tasks)\nGeneral Applications: 10 (10% reserved)\nGaming/Streaming: 0 (0% reserved, maximum gaming priority)",
          type: "info",
        },
        {
          title: "Performance Impact",
          content:
            "- Setting to 0 gives 100% CPU availability to gaming\n- Reduces frame rate stuttering\n- Improves frame consistency\n- Frees up CPU for physics calculations and AI processing",
          type: "info",
        },
      ],
    },
    {
      id: "check-current-responsiveness",
      name: "Check Current SystemResponsiveness",
      description: "View your current MMCSS CPU reservation setting",
      benefit: "Verify current CPU reservation before making changes",
      impactLevel: "low" as const,
      subsections: [
        {
          title: "View Current Value",
          content:
            "This command shows your current SystemResponsiveness value. Default on desktop Windows is 20.",
          command:
            'Get-ItemProperty -Path "HKLM:\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile" -Name "SystemResponsiveness"',
          language: "powershell",
        },
        {
          title: "Expected Default Output",
          content: "SystemResponsiveness : 20",
          type: "info",
        },
      ],
    },
    {
      id: "set-system-responsiveness-zero",
      name: "Set SystemResponsiveness to 0",
      description: "Configure maximum CPU priority for gaming applications",
      benefit: "Frees all CPU resources for gaming, maximum performance",
      impactLevel: "high" as const,
      subsections: [
        {
          title: "Set SystemResponsiveness to 0",
          content:
            "This sets SystemResponsiveness to 0, meaning 0% CPU is reserved for background processes and games get 100% CPU availability.",
          command:
            'New-ItemProperty -Path "HKLM:\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile" -Name "SystemResponsiveness" -PropertyType DWord -Value 0 -Force',
          language: "powershell",
        },
        {
          title: "Important",
          content:
            "This change requires administrator privileges. Windows restart is recommended but not always required.",
          type: "warning",
        },
      ],
    },
    {
      id: "configure-gpu-priority",
      name: "Configure GPU Priority",
      description: "Set GPU scheduling priority for games task",
      benefit: "Ensures GPU prioritizes game rendering",
      impactLevel: "medium" as const,
      subsections: [
        {
          title: "Set GPU Priority to 8",
          content:
            "GPU Priority ranges from 0-31. Value 8 is optimal for gaming, giving high priority to GPU tasks without starving other GPU work.",
          command:
            '$path = "HKLM:\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile\\Tasks\\Games"\nNew-ItemProperty -Path $path -Name "GPU Priority" -PropertyType DWord -Value 8 -Force',
          language: "powershell",
        },
        {
          title: "Note",
          content:
            "The Games task must exist in the registry. This is created automatically by Windows or during multimedia configuration.",
          type: "info",
        },
      ],
    },
    {
      id: "configure-scheduling-category",
      name: "Configure Scheduling Category",
      description: "Set scheduling priority category for games",
      benefit: "Ensures games run in high-priority scheduling category",
      impactLevel: "medium" as const,
      subsections: [
        {
          title: "Set Scheduling Category to High",
          content:
            "Scheduling Category determines how the MMCSS scheduler treats the task. 'High' gives maximum priority.",
          command:
            '$path = "HKLM:\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile\\Tasks\\Games"\nNew-ItemProperty -Path $path -Name "Scheduling Category" -PropertyType String -Value "High" -Force',
          language: "powershell",
        },
      ],
    },
    {
      id: "configure-sfio-priority",
      name: "Configure SFIO Priority",
      description: "Set System File I/O priority for games",
      benefit: "Prioritizes disk I/O for game asset loading",
      impactLevel: "medium" as const,
      subsections: [
        {
          title: "Set SFIO Priority to High",
          content:
            "SFIO (System File I/O) Priority determines disk access priority. 'High' ensures game asset loading is prioritized.",
          command:
            '$path = "HKLM:\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile\\Tasks\\Games"\nNew-ItemProperty -Path $path -Name "SFIO Priority" -PropertyType String -Value "High" -Force',
          language: "powershell",
        },
      ],
    },
    {
      id: "configure-task-priority",
      name: "Configure Task Priority",
      description: "Set thread priority for games task",
      benefit: "Ensures game threads get high priority",
      impactLevel: "medium" as const,
      subsections: [
        {
          title: "Set Priority to 6",
          content:
            "Priority ranges from 1-8. Value 6 is high priority without causing too much CPU contention with system tasks.",
          command:
            '$path = "HKLM:\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile\\Tasks\\Games"\nNew-ItemProperty -Path $path -Name "Priority" -PropertyType DWord -Value 6 -Force',
          language: "powershell",
        },
      ],
    },
    {
      id: "complete-gaming-profile",
      name: "Apply Complete Gaming Profile",
      description: "Apply all gaming optimization settings at once",
      benefit: "Comprehensive gaming optimization in one script",
      impactLevel: "high" as const,
      subsections: [
        {
          title: "Complete Gaming Configuration Script",
          content:
            "This script applies all recommended gaming optimization settings.",
          command:
            '# Set SystemResponsiveness to 0\n$profilePath = "HKLM:\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile"\nNew-ItemProperty -Path $profilePath -Name "SystemResponsiveness" -PropertyType DWord -Value 0 -Force\n\n# Configure Games task\n$gamesPath = "HKLM:\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile\\Tasks\\Games"\nNew-ItemProperty -Path $gamesPath -Name "GPU Priority" -PropertyType DWord -Value 8 -Force\nNew-ItemProperty -Path $gamesPath -Name "Scheduling Category" -PropertyType String -Value "High" -Force\nNew-ItemProperty -Path $gamesPath -Name "SFIO Priority" -PropertyType String -Value "High" -Force\nNew-ItemProperty -Path $gamesPath -Name "Priority" -PropertyType DWord -Value 6 -Force\nNew-ItemProperty -Path $gamesPath -Name "Affinity" -PropertyType DWord -Value 0 -Force\nNew-ItemProperty -Path $gamesPath -Name "Background Only" -PropertyType String -Value "False" -Force\nNew-ItemProperty -Path $gamesPath -Name "Clock Rate" -PropertyType DWord -Value 2710 -Force',
          language: "powershell",
        },
      ],
    },
    {
      id: "verify-gaming-settings",
      name: "Verify Gaming Settings",
      description: "Check that all gaming optimization settings were applied",
      benefit: "Confirms configuration changes took effect",
      impactLevel: "low" as const,
      subsections: [
        {
          title: "Check SystemResponsiveness",
          content: "Verify the main SystemResponsiveness setting is now 0.",
          command:
            'Get-ItemProperty -Path "HKLM:\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile" -Name "SystemResponsiveness"',
          language: "powershell",
        },
        {
          title: "Check Games Task Settings",
          content: "Verify all Games task settings are configured.",
          command:
            '$path = "HKLM:\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile\\Tasks\\Games"\nGet-ItemProperty -Path $path | Select-Object "GPU Priority", "Priority", "Scheduling Category", "SFIO Priority"',
          language: "powershell",
        },
      ],
    },
    {
      id: "system-responsiveness-best-practices",
      name: "System Responsiveness Best Practices",
      description:
        "Important guidelines for applying system responsiveness optimizations",
      benefit: "Prevents issues and ensures optimal configuration",
      impactLevel: "high" as const,
      subsections: [
        {
          title: "Before Making Changes",
          content:
            "1. Create a system restore point\n2. Run PowerShell as Administrator\n3. Close all games and resource-intensive applications\n4. Note your current settings before making changes\n5. Test performance in your main games",
          type: "warning",
        },
        {
          title: "Windows Server Note",
          content:
            "On Windows Server, SystemResponsiveness defaults to 100, giving priority to background services over multimedia. Do not set to 0 on Server OS.",
          type: "warning",
        },
        {
          title: "Compatibility",
          content:
            "Works on Windows 7, 8, 10, and 11 (desktop versions). Server versions behave differently.",
          type: "info",
        },
        {
          title: "Testing Results",
          content:
            "Expected improvements: Smoother frame times, reduced frame rate stuttering, better performance in CPU-heavy games. Improvement varies by game and system.",
          type: "info",
        },
      ],
    },
  ] as Tweak[],
  es: [
    {
      id: "system-responsiveness-overview",
      name: "Entendiendo System Responsiveness",
      description:
        "Aprende cómo la reserva de CPU de MMCSS impacta el rendimiento de juegos",
      benefit:
        "Entender la reserva de CPU ayuda a optimizar el rendimiento de juegos",
      impactLevel: "low" as const,
      subsections: [
        {
          title: "¿Qué es MMCSS?",
          content:
            "MMCSS (Multimedia Class Scheduler) es un servicio de Windows que reserva 20% de CPU por defecto para procesos en segundo plano. Esto significa que las aplicaciones de gaming solo pueden usar hasta 80% de tu CPU, incluso si hay más disponible. Reducir esta reserva da más potencia de CPU a los juegos.",
          type: "info",
        },
        {
          title: "Valores de SystemResponsiveness",
          content:
            "Por defecto: 20 (20% de CPU reservado para tareas en segundo plano)\nAplicaciones generales: 10 (10% reservado)\nGaming/Streaming: 0 (0% reservado, máxima prioridad de gaming)",
          type: "info",
        },
        {
          title: "Impacto en Rendimiento",
          content:
            "- Establecer a 0 da 100% de disponibilidad de CPU para gaming\n- Reduce stuttering de frame rate\n- Mejora consistencia de frames\n- Libera CPU para cálculos de física e IA",
          type: "info",
        },
      ],
    },
    {
      id: "check-current-responsiveness",
      name: "Verificar SystemResponsiveness Actual",
      description: "Ver tu configuración actual de reserva de CPU de MMCSS",
      benefit: "Verifica la reserva de CPU actual antes de hacer cambios",
      impactLevel: "low" as const,
      subsections: [
        {
          title: "Ver Valor Actual",
          content:
            "Este comando muestra tu valor actual de SystemResponsiveness. El valor por defecto en Windows de escritorio es 20.",
          command:
            'Get-ItemProperty -Path "HKLM:\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile" -Name "SystemResponsiveness"',
          language: "powershell",
        },
        {
          title: "Salida Esperada por Defecto",
          content: "SystemResponsiveness : 20",
          type: "info",
        },
      ],
    },
    {
      id: "set-system-responsiveness-zero",
      name: "Establecer SystemResponsiveness a 0",
      description:
        "Configura máxima prioridad de CPU para aplicaciones de gaming",
      benefit:
        "Libera todos los recursos de CPU para gaming, rendimiento máximo",
      impactLevel: "high" as const,
      subsections: [
        {
          title: "Establecer SystemResponsiveness a 0",
          content:
            "Esto establece SystemResponsiveness a 0, significando que 0% de CPU se reserva para procesos en segundo plano y los juegos obtienen 100% de disponibilidad de CPU.",
          command:
            'New-ItemProperty -Path "HKLM:\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile" -Name "SystemResponsiveness" -PropertyType DWord -Value 0 -Force',
          language: "powershell",
        },
        {
          title: "Importante",
          content:
            "Este cambio requiere privilegios de administrador. Se recomienda reinicio de Windows pero no siempre es requerido.",
          type: "warning",
        },
      ],
    },
    {
      id: "configure-gpu-priority",
      name: "Configurar Prioridad de GPU",
      description:
        "Establece la prioridad de planificación de GPU para la tarea de juegos",
      benefit: "Asegura que la GPU priorice el renderizado de juegos",
      impactLevel: "medium" as const,
      subsections: [
        {
          title: "Establecer GPU Priority a 8",
          content:
            "GPU Priority va de 0-31. Valor 8 es óptimo para gaming, dando alta prioridad a tareas de GPU sin inanición de otro trabajo de GPU.",
          command:
            '$path = "HKLM:\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile\\Tasks\\Games"\nNew-ItemProperty -Path $path -Name "GPU Priority" -PropertyType DWord -Value 8 -Force',
          language: "powershell",
        },
        {
          title: "Nota",
          content:
            "La tarea Games debe existir en el registro. Esto se crea automáticamente por Windows o durante configuración multimedia.",
          type: "info",
        },
      ],
    },
    {
      id: "configure-scheduling-category",
      name: "Configurar Categoría de Planificación",
      description:
        "Establece la categoría de prioridad de planificación para juegos",
      benefit:
        "Asegura que los juegos se ejecuten en categoría de planificación de alta prioridad",
      impactLevel: "medium" as const,
      subsections: [
        {
          title: "Establecer Scheduling Category a High",
          content:
            "Scheduling Category determina cómo el planificador MMCSS trata la tarea. 'High' da máxima prioridad.",
          command:
            '$path = "HKLM:\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile\\Tasks\\Games"\nNew-ItemProperty -Path $path -Name "Scheduling Category" -PropertyType String -Value "High" -Force',
          language: "powershell",
        },
      ],
    },
    {
      id: "configure-sfio-priority",
      name: "Configurar Prioridad de SFIO",
      description:
        "Establece la prioridad de E/S de Archivos del Sistema para juegos",
      benefit: "Prioriza acceso a disco para carga de assets de juego",
      impactLevel: "medium" as const,
      subsections: [
        {
          title: "Establecer SFIO Priority a High",
          content:
            "SFIO (System File I/O) Priority determina la prioridad de acceso a disco. 'High' asegura que la carga de assets de juego sea priorizada.",
          command:
            '$path = "HKLM:\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile\\Tasks\\Games"\nNew-ItemProperty -Path $path -Name "SFIO Priority" -PropertyType String -Value "High" -Force',
          language: "powershell",
        },
      ],
    },
    {
      id: "configure-task-priority",
      name: "Configurar Prioridad de Tarea",
      description: "Establece la prioridad de thread para la tarea de juegos",
      benefit: "Asegura que los threads del juego obtengan alta prioridad",
      impactLevel: "medium" as const,
      subsections: [
        {
          title: "Establecer Priority a 6",
          content:
            "Priority va de 1-8. Valor 6 es alta prioridad sin causar demasiada contención de CPU con tareas del sistema.",
          command:
            '$path = "HKLM:\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile\\Tasks\\Games"\nNew-ItemProperty -Path $path -Name "Priority" -PropertyType DWord -Value 6 -Force',
          language: "powershell",
        },
      ],
    },
    {
      id: "complete-gaming-profile",
      name: "Aplicar Perfil de Gaming Completo",
      description:
        "Aplica todas las configuraciones de optimización de gaming de una vez",
      benefit: "Optimización de gaming integral en un script",
      impactLevel: "high" as const,
      subsections: [
        {
          title: "Script Completo de Configuración de Gaming",
          content:
            "Este script aplica todas las configuraciones recomendadas de optimización de gaming.",
          command:
            '# Establecer SystemResponsiveness a 0\n$profilePath = "HKLM:\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile"\nNew-ItemProperty -Path $profilePath -Name "SystemResponsiveness" -PropertyType DWord -Value 0 -Force\n\n# Configurar tarea Games\n$gamesPath = "HKLM:\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile\\Tasks\\Games"\nNew-ItemProperty -Path $gamesPath -Name "GPU Priority" -PropertyType DWord -Value 8 -Force\nNew-ItemProperty -Path $gamesPath -Name "Scheduling Category" -PropertyType String -Value "High" -Force\nNew-ItemProperty -Path $gamesPath -Name "SFIO Priority" -PropertyType String -Value "High" -Force\nNew-ItemProperty -Path $gamesPath -Name "Priority" -PropertyType DWord -Value 6 -Force\nNew-ItemProperty -Path $gamesPath -Name "Affinity" -PropertyType DWord -Value 0 -Force\nNew-ItemProperty -Path $gamesPath -Name "Background Only" -PropertyType String -Value "False" -Force\nNew-ItemProperty -Path $gamesPath -Name "Clock Rate" -PropertyType DWord -Value 2710 -Force',
          language: "powershell",
        },
      ],
    },
    {
      id: "verify-gaming-settings",
      name: "Verificar Configuración de Gaming",
      description:
        "Verifica que todas las configuraciones de optimización de gaming fueron aplicadas",
      benefit: "Confirma que los cambios de configuración tuvieron efecto",
      impactLevel: "low" as const,
      subsections: [
        {
          title: "Verificar SystemResponsiveness",
          content:
            "Verifica que la configuración principal de SystemResponsiveness sea ahora 0.",
          command:
            'Get-ItemProperty -Path "HKLM:\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile" -Name "SystemResponsiveness"',
          language: "powershell",
        },
        {
          title: "Verificar Configuración de Tarea Games",
          content:
            "Verifica que todas las configuraciones de tarea Games estén configuradas.",
          command:
            '$path = "HKLM:\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile\\Tasks\\Games"\nGet-ItemProperty -Path $path | Select-Object "GPU Priority", "Priority", "Scheduling Category", "SFIO Priority"',
          language: "powershell",
        },
      ],
    },
    {
      id: "system-responsiveness-best-practices",
      name: "Mejores Prácticas de System Responsiveness",
      description:
        "Directrices importantes para aplicar optimizaciones de system responsiveness",
      benefit: "Previene problemas y asegura configuración óptima",
      impactLevel: "high" as const,
      subsections: [
        {
          title: "Antes de Hacer Cambios",
          content:
            "1. Crea un punto de restauración del sistema\n2. Ejecuta PowerShell como Administrador\n3. Cierra todos los juegos y aplicaciones que usen muchos recursos\n4. Anota tu configuración actual antes de hacer cambios\n5. Prueba el rendimiento en tus juegos principales",
          type: "warning",
        },
        {
          title: "Nota de Windows Server",
          content:
            "En Windows Server, SystemResponsiveness tiene como valor por defecto 100, dando prioridad a servicios en segundo plano sobre multimedia. No establezcas a 0 en Server OS.",
          type: "warning",
        },
        {
          title: "Compatibilidad",
          content:
            "Funciona en Windows 7, 8, 10 y 11 (versiones de escritorio). Las versiones Server se comportan diferente.",
          type: "info",
        },
        {
          title: "Resultados de Pruebas",
          content:
            "Mejoras esperadas: Tiempos de frame más suave, reducción de stuttering de frame rate, mejor rendimiento en juegos intensivos de CPU. La mejora varía según el juego y sistema.",
          type: "info",
        },
      ],
    },
  ] as Tweak[],
};
