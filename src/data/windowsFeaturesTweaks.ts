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

export const windowsFeaturesTweaks = {
  en: [
    {
      id: "virtualization-features",
      name: "Disable Virtualization Features",
      description:
        "Disable Hyper-V, WSL, and virtualization-related features if not needed",
      benefit:
        "Frees up system resources and improves performance if virtualization is not used",
      impactLevel: "medium" as const,
      subsections: [
        {
          title: "Disable Virtualization Components",
          content:
            "Disables Hyper-V, Virtual Machine Platform, Windows Subsystem for Linux, and ProjFS. Only disable if you don't use these features.",
          command:
            "Dism.exe /Online /Disable-Feature /NoRestart /featurename:HypervisorPlatform\nDism.exe /Online /Disable-Feature /NoRestart /featurename:VirtualMachinePlatform\nDism.exe /Online /Disable-Feature /NoRestart /featurename:Microsoft-Windows-Subsystem-Linux\nDism.exe /Online /Disable-Feature /NoRestart /featurename:Client-ProjFS",
          language: "powershell",
        },
        {
          title: "Important Note",
          content:
            "Disabling these features will prevent running virtual machines, WSL, and Docker containers.",
          type: "warning",
        },
      ],
    },
    {
      id: "iis-services",
      name: "Disable IIS and Web Services",
      description:
        "Remove IIS and web server components if not running web services",
      benefit:
        "Reduces system footprint and closes unnecessary network services",
      impactLevel: "medium" as const,
      subsections: [
        {
          title: "Disable IIS Components",
          content:
            "Removes Internet Information Services and related web server components.",
          command:
            "Dism.exe /Online /Disable-Feature /NoRestart /featurename:IIS-WebServer\nDism.exe /Online /Disable-Feature /NoRestart /featurename:IIS-WebServerRole\nDism.exe /Online /Disable-Feature /NoRestart /featurename:IIS-WebServerManagementTools\nDism.exe /Online /Disable-Feature /NoRestart /featurename:IIS-ManagementConsole",
          language: "powershell",
        },
        {
          title: "When to Disable",
          content:
            "Safe to disable if you don't run web services or development environments requiring IIS.",
          type: "info",
        },
      ],
    },
    {
      id: "legacy-components",
      name: "Disable Legacy Components",
      description: "Remove outdated and rarely-used Windows components",
      benefit:
        "Reduces system bloat, improves startup time, and enhances security by removing old code",
      impactLevel: "low" as const,
      subsections: [
        {
          title: "Disable Legacy Features",
          content:
            "Removes Internet Explorer, Windows Media Player, DirectPlay, and PowerShell v2. These are rarely needed on modern systems.",
          command:
            "Dism.exe /Online /Disable-Feature /NoRestart /featurename:Internet-Explorer-Optional-amd64\nDism.exe /Online /Disable-Feature /NoRestart /featurename:WindowsMediaPlayer\nDism.exe /Online /Disable-Feature /NoRestart /featurename:DirectPlay\nDism.exe /Online /Disable-Feature /NoRestart /featurename:LegacyComponents\nDism.exe /Online /Disable-Feature /NoRestart /featurename:MicrosoftWindowsPowerShellV2\nDism.exe /Online /Disable-Feature /NoRestart /featurename:MicrosoftWindowsPowerShellV2Root",
          language: "powershell",
        },
        {
          title: "Note",
          content:
            "Windows Media Player can be replaced with modern media players like VLC or Windows 11 Media Player.",
          type: "info",
        },
      ],
    },
    {
      id: "smb1-protocol",
      name: "Disable SMB1 Protocol",
      description:
        "Remove the insecure SMB1 protocol which has known vulnerabilities",
      benefit:
        "Significantly improves security by removing outdated and vulnerable network protocol",
      impactLevel: "high" as const,
      subsections: [
        {
          title: "Disable SMB1",
          content:
            "SMB1 is deprecated and has multiple security vulnerabilities. Should be disabled on all systems. Modern systems use SMB2/3.",
          command:
            "Dism.exe /Online /Disable-Feature /NoRestart /featurename:SMB1Protocol\nDism.exe /Online /Disable-Feature /NoRestart /featurename:SMB1Protocol-Client\nDism.exe /Online /Disable-Feature /NoRestart /featurename:SMB1Protocol-Server",
          language: "powershell",
        },
        {
          title: "Security Warning",
          content:
            "SMB1 has been the target of multiple ransomware attacks (WannaCry, etc.). Disabling is strongly recommended.",
          type: "warning",
        },
      ],
    },
    {
      id: "unused-network-services",
      name: "Disable Unused Network Services",
      description: "Remove rarely-used network service features",
      benefit:
        "Reduces attack surface and frees up resources by disabling obsolete protocols",
      impactLevel: "low" as const,
      subsections: [
        {
          title: "Disable Network Services",
          content:
            "Removes Telnet Client, TFTP, SNMP, and SimpleTCP. These are legacy protocols rarely used on modern networks.",
          command:
            "Dism.exe /Online /Disable-Feature /NoRestart /featurename:TelnetClient\nDism.exe /Online /Disable-Feature /NoRestart /featurename:TFTP\nDism.exe /Online /Disable-Feature /NoRestart /featurename:SNMP\nDism.exe /Online /Disable-Feature /NoRestart /featurename:SimpleTCP",
          language: "powershell",
        },
      ],
    },
    {
      id: "msmq-services",
      name: "Disable MSMQ (Message Queuing)",
      description:
        "Remove Message Queuing components if not used for enterprise messaging",
      benefit:
        "Frees resources by removing unused enterprise messaging infrastructure",
      impactLevel: "low" as const,
      subsections: [
        {
          title: "Disable MSMQ",
          content:
            "Removes Message Queuing components. Only needed if using MSMQ for application integration.",
          command:
            "Dism.exe /Online /Disable-Feature /NoRestart /featurename:MSMQ-Container\nDism.exe /Online /Disable-Feature /NoRestart /featurename:MSMQ-Server\nDism.exe /Online /Disable-Feature /NoRestart /featurename:MSMQ-HTTP\nDism.exe /Online /Disable-Feature /NoRestart /featurename:MSMQ-Triggers",
          language: "powershell",
        },
      ],
    },
    {
      id: "enable-useful-features",
      name: "Enable Useful Features",
      description:
        "Enable beneficial Windows features for system compatibility and functionality",
      benefit:
        "Ensures system has necessary components for optimal compatibility",
      impactLevel: "low" as const,
      subsections: [
        {
          title: "Enable Recommended Features",
          content:
            "Enables .NET Framework, PDF printing, Windows Search, and Defender definitions. Recommended for all users.",
          command:
            "Dism.exe /Online /Enable-Feature /NoRestart /featurename:NetFx3\nDism.exe /Online /Enable-Feature /NoRestart /featurename:NetFx4-AdvSrvs\nDism.exe /Online /Enable-Feature /NoRestart /featurename:Printing-PrintToPDFServices-Features\nDism.exe /Online /Enable-Feature /NoRestart /featurename:SearchEngine-Client-Package\nDism.exe /Online /Enable-Feature /NoRestart /featurename:Windows-Defender-Default-Definitions",
          language: "powershell",
        },
      ],
    },
    {
      id: "check-disabled-features",
      name: "Check Disabled Features",
      description: "Verify which Windows features are currently disabled",
      benefit:
        "Helps identify which features have been disabled and monitor system configuration",
      impactLevel: "low" as const,
      subsections: [
        {
          title: "View Disabled Features",
          content: "Shows only disabled Windows features",
          command:
            "Dism.exe /Online /Get-Features /Format:Table | Select-String 'Disabled'",
          language: "powershell",
        },
        {
          title: "View All Features",
          content: "Shows all Windows features with their current state",
          command: "Dism.exe /Online /Get-Features",
          language: "powershell",
        },
      ],
    },
    {
      id: "dism-best-practices",
      name: "DISM Best Practices",
      description: "Important guidelines for safely managing Windows features",
      benefit:
        "Prevents system instability and ensures safe feature management with proper backup",
      impactLevel: "high" as const,
      subsections: [
        {
          title: "Before Making Changes",
          content:
            "1. Create a system restore point\n2. Run all commands as Administrator\n3. Use /NoRestart flag to group changes\n4. Test on a non-critical system first",
          type: "warning",
        },
        {
          title: "Important Notes",
          content:
            "- Backup: Create a restore point before changes\n- Permissions: Always run as Administrator\n- Restart: Manually restart after all changes\n- Reversible: Use /Enable-Feature to revert disabled features\n- NoRestart: Use /NoRestart flag to batch multiple commands",
          type: "info",
        },
      ],
    },
  ] as Tweak[],
  es: [
    {
      id: "virtualization-features",
      name: "Desactivar Características de Virtualización",
      description:
        "Desactiva Hyper-V, WSL y características relacionadas con virtualización si no se necesitan",
      benefit:
        "Libera recursos del sistema y mejora el rendimiento si no se usa virtualización",
      impactLevel: "medium" as const,
      subsections: [
        {
          title: "Desactivar Componentes de Virtualización",
          content:
            "Desactiva Hyper-V, Plataforma de Máquina Virtual, Subsistema de Windows para Linux y ProjFS. Solo desactiva si no usas estas características.",
          command:
            "Dism.exe /Online /Disable-Feature /NoRestart /featurename:HypervisorPlatform\nDism.exe /Online /Disable-Feature /NoRestart /featurename:VirtualMachinePlatform\nDism.exe /Online /Disable-Feature /NoRestart /featurename:Microsoft-Windows-Subsystem-Linux\nDism.exe /Online /Disable-Feature /NoRestart /featurename:Client-ProjFS",
          language: "powershell",
        },
        {
          title: "Nota Importante",
          content:
            "Desactivar estas características impedirá ejecutar máquinas virtuales, WSL y contenedores Docker.",
          type: "warning",
        },
      ],
    },
    {
      id: "iis-services",
      name: "Desactivar IIS y Servicios Web",
      description:
        "Remove IIS y componentes de servidor web si no ejecutas servicios web",
      benefit:
        "Reduce la huella del sistema y cierra servicios de red innecesarios",
      impactLevel: "medium" as const,
      subsections: [
        {
          title: "Desactivar Componentes de IIS",
          content:
            "Desactiva Internet Information Services y componentes relacionados de servidor web.",
          command:
            "Dism.exe /Online /Disable-Feature /NoRestart /featurename:IIS-WebServer\nDism.exe /Online /Disable-Feature /NoRestart /featurename:IIS-WebServerRole\nDism.exe /Online /Disable-Feature /NoRestart /featurename:IIS-WebServerManagementTools\nDism.exe /Online /Disable-Feature /NoRestart /featurename:IIS-ManagementConsole",
          language: "powershell",
        },
        {
          title: "Cuándo Desactivar",
          content:
            "Es seguro desactivar si no ejecutas servicios web o entornos de desarrollo que requieran IIS.",
          type: "info",
        },
      ],
    },
    {
      id: "legacy-components",
      name: "Desactivar Componentes Legacy",
      description: "Elimina componentes de Windows antiguos y raramente usados",
      benefit:
        "Reduce la inflación del sistema, mejora el tiempo de inicio y enhances security al eliminar código antiguo",
      impactLevel: "low" as const,
      subsections: [
        {
          title: "Desactivar Características Legacy",
          content:
            "Elimina Internet Explorer, Windows Media Player, DirectPlay y PowerShell v2. Estos rara vez se necesitan en sistemas modernos.",
          command:
            "Dism.exe /Online /Disable-Feature /NoRestart /featurename:Internet-Explorer-Optional-amd64\nDism.exe /Online /Disable-Feature /NoRestart /featurename:WindowsMediaPlayer\nDism.exe /Online /Disable-Feature /NoRestart /featurename:DirectPlay\nDism.exe /Online /Disable-Feature /NoRestart /featurename:LegacyComponents\nDism.exe /Online /Disable-Feature /NoRestart /featurename:MicrosoftWindowsPowerShellV2\nDism.exe /Online /Disable-Feature /NoRestart /featurename:MicrosoftWindowsPowerShellV2Root",
          language: "powershell",
        },
        {
          title: "Nota",
          content:
            "Windows Media Player puede ser reemplazado con reproductores multimedia modernos como VLC o Windows 11 Media Player.",
          type: "info",
        },
      ],
    },
    {
      id: "smb1-protocol",
      name: "Desactivar Protocolo SMB1",
      description:
        "Elimina el protocolo SMB1 inseguro que tiene vulnerabilidades conocidas",
      benefit:
        "Mejora significativamente la seguridad al eliminar el protocolo de red obsoleto y vulnerable",
      impactLevel: "high" as const,
      subsections: [
        {
          title: "Desactivar SMB1",
          content:
            "SMB1 es obsoleto y tiene múltiples vulnerabilidades de seguridad. Debe desactivarse en todos los sistemas. Los sistemas modernos usan SMB2/3.",
          command:
            "Dism.exe /Online /Disable-Feature /NoRestart /featurename:SMB1Protocol\nDism.exe /Online /Disable-Feature /NoRestart /featurename:SMB1Protocol-Client\nDism.exe /Online /Disable-Feature /NoRestart /featurename:SMB1Protocol-Server",
          language: "powershell",
        },
        {
          title: "Advertencia de Seguridad",
          content:
            "SMB1 ha sido objeto de múltiples ataques de ransomware (WannaCry, etc.). Se recomienda desactivar.",
          type: "warning",
        },
      ],
    },
    {
      id: "unused-network-services",
      name: "Desactivar Servicios de Red No Utilizados",
      description:
        "Elimina características de servicios de red raramente usados",
      benefit:
        "Reduce la superficie de ataque y libera recursos deshabilitando protocolos obsoletos",
      impactLevel: "low" as const,
      subsections: [
        {
          title: "Desactivar Servicios de Red",
          content:
            "Elimina Cliente Telnet, TFTP, SNMP y SimpleTCP. Estos son protocolos heredados raramente usados en redes modernas.",
          command:
            "Dism.exe /Online /Disable-Feature /NoRestart /featurename:TelnetClient\nDism.exe /Online /Disable-Feature /NoRestart /featurename:TFTP\nDism.exe /Online /Disable-Feature /NoRestart /featurename:SNMP\nDism.exe /Online /Disable-Feature /NoRestart /featurename:SimpleTCP",
          language: "powershell",
        },
      ],
    },
    {
      id: "msmq-services",
      name: "Desactivar MSMQ (Message Queuing)",
      description:
        "Elimina componentes de Message Queuing si no se utiliza para mensajería empresarial",
      benefit:
        "Libera recursos eliminando infraestructura de mensajería empresarial no utilizada",
      impactLevel: "low" as const,
      subsections: [
        {
          title: "Desactivar MSMQ",
          content:
            "Elimina componentes de Message Queuing. Solo es necesario si usas MSMQ para integración de aplicaciones.",
          command:
            "Dism.exe /Online /Disable-Feature /NoRestart /featurename:MSMQ-Container\nDism.exe /Online /Disable-Feature /NoRestart /featurename:MSMQ-Server\nDism.exe /Online /Disable-Feature /NoRestart /featurename:MSMQ-HTTP\nDism.exe /Online /Disable-Feature /NoRestart /featurename:MSMQ-Triggers",
          language: "powershell",
        },
      ],
    },
    {
      id: "enable-useful-features",
      name: "Habilitar Características Útiles",
      description:
        "Habilita características de Windows beneficiosas para compatibilidad y funcionalidad del sistema",
      benefit:
        "Asegura que el sistema tenga componentes necesarios para compatibilidad óptima",
      impactLevel: "low" as const,
      subsections: [
        {
          title: "Habilitar Características Recomendadas",
          content:
            "Habilita .NET Framework, impresión de PDF, Windows Search y definiciones de Defender. Recomendado para todos los usuarios.",
          command:
            "Dism.exe /Online /Enable-Feature /NoRestart /featurename:NetFx3\nDism.exe /Online /Enable-Feature /NoRestart /featurename:NetFx4-AdvSrvs\nDism.exe /Online /Enable-Feature /NoRestart /featurename:Printing-PrintToPDFServices-Features\nDism.exe /Online /Enable-Feature /NoRestart /featurename:SearchEngine-Client-Package\nDism.exe /Online /Enable-Feature /NoRestart /featurename:Windows-Defender-Default-Definitions",
          language: "powershell",
        },
      ],
    },
    {
      id: "check-disabled-features",
      name: "Verificar Características Desactivadas",
      description:
        "Verifica qué características de Windows están actualmente desactivadas",
      benefit:
        "Ayuda a identificar qué características han sido desactivadas y monitorear la configuración del sistema",
      impactLevel: "low" as const,
      subsections: [
        {
          title: "Ver Características Desactivadas",
          content: "Muestra solo características de Windows desactivadas",
          command:
            "Dism.exe /Online /Get-Features /Format:Table | Select-String 'Disabled'",
          language: "powershell",
        },
        {
          title: "Ver Todas las Características",
          content:
            "Muestra todas las características de Windows con su estado actual",
          command: "Dism.exe /Online /Get-Features",
          language: "powershell",
        },
      ],
    },
    {
      id: "dism-best-practices",
      name: "Mejores Prácticas de DISM",
      description:
        "Directrices importantes para gestionar de forma segura las características de Windows",
      benefit:
        "Previene inestabilidad del sistema y asegura gestión segura de características con respaldo adecuado",
      impactLevel: "high" as const,
      subsections: [
        {
          title: "Antes de Hacer Cambios",
          content:
            "1. Crea un punto de restauración del sistema\n2. Ejecuta todos los comandos como Administrador\n3. Usa la bandera /NoRestart para agrupar cambios\n4. Prueba en un sistema no crítico primero",
          type: "warning",
        },
        {
          title: "Notas Importantes",
          content:
            "- Respaldo: Crea un punto de restauración antes de los cambios\n- Permisos: Siempre ejecuta como Administrador\n- Reinicio: Reinicia manualmente después de todos los cambios\n- Reversible: Usa /Enable-Feature para revertir características desactivadas\n- NoRestart: Usa la bandera /NoRestart para agrupar múltiples comandos",
          type: "info",
        },
      ],
    },
  ] as Tweak[],
};
