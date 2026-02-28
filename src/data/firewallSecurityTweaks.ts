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

export const firewallSecurityTweaks = {
  en: [
    {
      id: "firewall-app-rules",
      name: "Disable Unnecessary App Firewall Rules",
      description:
        "Disable firewall rules for built-in Windows apps that may not be needed",
      benefit:
        "Reduces attack surface and network exposure for unused applications",
      impactLevel: "medium" as const,
      subsections: [
        {
          title: "Disable Windows App Firewall Rules",
          content:
            "Disables firewall rules for built-in Windows applications like Cortana, Feedback Hub, Photos, etc. Only disable if you don't use these apps.",
          command:
            'netsh advfirewall firewall set rule group="Connect" new enable=no\nnetsh advfirewall firewall set rule group="Contact Support" new enable=no\nnetsh advfirewall firewall set rule group="Cortana" new enable=no\nnetsh advfirewall firewall set rule group="DiagTrack" new enable=no\nnetsh advfirewall firewall set rule group="Feedback Hub" new enable=no\nnetsh advfirewall firewall set rule group="Microsoft Photos" new enable=no\nnetsh advfirewall firewall set rule group="OneNote" new enable=no\nnetsh advfirewall firewall set rule group="Remote Assistance" new enable=no\nnetsh advfirewall firewall set rule group="Windows Spotlight" new enable=no',
          language: "powershell",
        },
      ],
    },
    {
      id: "block-smb-port",
      name: "Block SMB Port 445",
      description:
        "Block incoming SMB traffic on port 445 to prevent ransomware attacks",
      benefit:
        "Significantly improves security by blocking major attack vector for ransomware and worms",
      impactLevel: "high" as const,
      subsections: [
        {
          title: "Block Port 445",
          content:
            "Adds firewall rule to block incoming SMB traffic. SMB port 445 is frequently targeted by WannaCry, Petya, and other ransomware.",
          command:
            "netsh advfirewall firewall add rule name=deny445 dir=in action=block protocol=TCP localport=445",
          language: "powershell",
        },
        {
          title: "Security Note",
          content:
            "Port 445 is the primary vector for ransomware propagation on Windows networks. Blocking is highly recommended unless you require SMB shares.",
          type: "warning",
        },
      ],
    },
    {
      id: "firewall-profiles",
      name: "Configure Firewall Profiles",
      description:
        "Enable firewall on all profiles and restrict local firewall rules",
      benefit:
        "Ensures consistent firewall protection across all network scenarios",
      impactLevel: "high" as const,
      subsections: [
        {
          title: "Enable Firewall Profiles",
          content:
            "Enables Windows Firewall on Domain, Public, and Private profiles. Disallows local firewall rule modifications to prevent tampering.",
          command:
            "Set-NetFirewallProfile -Profile Domain,Public,Private -Enabled True -AllowLocalFirewallRules False",
          language: "powershell",
        },
        {
          title: "Protection",
          content:
            "Prevents malware from disabling firewall or creating exceptions for network access.",
          type: "info",
        },
      ],
    },
    {
      id: "disable-netbios",
      name: "Disable NetBIOS and LMHOSTS",
      description:
        "Disable legacy NetBIOS protocol that can expose system information",
      benefit:
        "Reduces exposure of computer names and network discovery attacks",
      impactLevel: "medium" as const,
      subsections: [
        {
          title: "Disable NetBIOS/LMHOSTS",
          content:
            "NetBIOS is a legacy protocol that broadcasts computer names on local networks. Modern systems use DNS instead.",
          command:
            'New-ItemProperty -Force -Path "HKLM:\\SYSTEM\\CurrentControlSet\\Services\\NetBT\\Parameters" -Name "EnableLMHOSTS" -PropertyType DWord -Value 0',
          language: "powershell",
        },
      ],
    },
    {
      id: "disable-network-adapters",
      name: "Disable Unnecessary Network Adapters",
      description:
        "Disable unused network components like Pacer, SMB Server, LLDP, and LLTD",
      benefit:
        "Reduces network exposure and removes potentially vulnerable network services",
      impactLevel: "medium" as const,
      subsections: [
        {
          title: "Disable Network Components",
          content:
            "Disables Pacer (QoS), SMB Server, LLDP (Link Layer Discovery Protocol), and LLTD (Link-Layer Topology Discovery). These are rarely needed for gaming or productivity.",
          command:
            '# Pacer (QoS)\nDisable-NetAdapterBinding -Name "*" -ComponentID "ms_pacer"\n\n# SMB Server\nDisable-NetAdapterBinding -Name "*" -ComponentID "ms_server"\n\n# LLDP\nDisable-NetAdapterBinding -Name "*" -ComponentID "ms_lldp"\n\n# LLTD\nDisable-NetAdapterBinding -Name "*" -ComponentID "ms_lltdio"\nDisable-NetAdapterBinding -Name "*" -ComponentID "ms_rspndr"',
          language: "powershell",
        },
      ],
    },
    {
      id: "disable-ipv6",
      name: "Disable IPv6",
      description: "Disable IPv6 protocol if you only use IPv4",
      benefit:
        "Reduces network complexity and potential security gaps from unused protocols",
      impactLevel: "low" as const,
      subsections: [
        {
          title: "Disable IPv6",
          content:
            "Disables IPv6 on network adapters. Only disable if your network exclusively uses IPv4. Some applications may require IPv6.",
          command:
            'Disable-NetAdapterBinding -Name "*" -ComponentID "ms_tcpip6"\nNew-ItemProperty -Force -Path "HKLM:\\SYSTEM\\CurrentControlSet\\Services\\TCPIP6\\Parameters" -Name "DisabledComponents" -PropertyType DWord -Value 0xFFFFFFFF',
          language: "powershell",
        },
        {
          title: "Warning",
          content:
            "Only disable if you exclusively use IPv4. Disabling IPv6 may break some applications or services that depend on it.",
          type: "warning",
        },
      ],
    },
    {
      id: "disable-smbv1",
      name: "Disable SMBv1 Protocol",
      description: "Disable insecure SMBv1 file sharing protocol",
      benefit: "Eliminates WannaCry and Petya ransomware attack vector",
      impactLevel: "high" as const,
      subsections: [
        {
          title: "Disable SMBv1",
          content:
            "SMBv1 has critical vulnerabilities and should always be disabled. Modern systems use SMB2/3.",
          command:
            'Set-ItemProperty -Path "HKLM:\\SYSTEM\\CurrentControlSet\\Services\\LanmanServer\\Parameters" -Name SMB1 -Value 0',
          language: "powershell",
        },
        {
          title: "Security Critical",
          content:
            "SMBv1 has been exploited by major ransomware attacks. Disabling is strongly recommended.",
          type: "warning",
        },
      ],
    },
    {
      id: "disable-file-printer-sharing",
      name: "Disable File and Printer Sharing",
      description:
        "Disable firewall rules for file and printer sharing if not needed",
      benefit:
        "Prevents unauthorized access to shared files and printers on network",
      impactLevel: "medium" as const,
      subsections: [
        {
          title: "Disable Sharing Rules",
          content:
            "Disables firewall rules allowing file and printer sharing. Only disable if you don't share files or printers on your network.",
          command:
            'netsh advfirewall firewall set rule group="File and Printer Sharing" new enable=no',
          language: "powershell",
        },
        {
          title: "Impact",
          content:
            "If you use network file/printer sharing, you'll need to enable these rules separately.",
          type: "info",
        },
      ],
    },
    {
      id: "credential-hardening",
      name: "Credential Hardening",
      description:
        "Configure token and credential policies to prevent credential theft attacks",
      benefit:
        "Protects administrator tokens from local privilege escalation attacks",
      impactLevel: "high" as const,
      subsections: [
        {
          title: "Enable Credential Protection",
          content:
            "Enables User Account Control (UAC) hardening, administrator token filtering, and local account token policies. Prevents credential theft via token impersonation.",
          command:
            "Set-ItemProperty HKLM:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\System -Name LocalAccountTokenFilterPolicy -Value 0\nSet-ItemProperty HKLM:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\System -Name FilterAdministratorToken -Value 1\nSet-ItemProperty HKLM:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\System -Name EnableLUA -Value 1",
          language: "powershell",
        },
        {
          title: "UAC Effect",
          content:
            "Ensures UAC prompts for all administrative operations, preventing silent privilege escalation.",
          type: "info",
        },
      ],
    },
    {
      id: "cleartext-password-protection",
      name: "Cleartext Password Protection",
      description:
        "Prevent storage of passwords in cleartext and enable token leak detection",
      benefit:
        "Prevents credential harvesting attacks that exploit cleartext password storage",
      impactLevel: "high" as const,
      subsections: [
        {
          title: "Disable Cleartext Passwords",
          content:
            "Disables WDigest cleartext password storage and enables token leak detection. WDigest stores passwords in memory in cleartext, creating severe security risk.",
          command:
            "Set-ItemProperty HKLM:\\SYSTEM\\CurrentControlSet\\Control\\SecurityProviders\\WDigest -Name UseLogonCredential -Value 0\nSet-ItemProperty HKLM:\\SYSTEM\\CurrentControlSet\\Control\\Lsa -Name TokenLeakDetectDelaySecs -Value 30",
          language: "powershell",
        },
        {
          title: "Security Critical",
          content:
            "WDigest cleartext passwords allow attackers to harvest credentials using tools like Mimikatz after system compromise.",
          type: "warning",
        },
      ],
    },
  ] as Tweak[],
  es: [
    {
      id: "firewall-app-rules",
      name: "Desactivar Reglas de Firewall de Apps Innecesarias",
      description:
        "Desactiva reglas de firewall para aplicaciones integradas de Windows que pueden no ser necesarias",
      benefit:
        "Reduce la superficie de ataque y la exposición de red para aplicaciones no utilizadas",
      impactLevel: "medium" as const,
      subsections: [
        {
          title: "Desactivar Reglas de Firewall de Apps de Windows",
          content:
            "Desactiva reglas de firewall para aplicaciones integradas de Windows como Cortana, Feedback Hub, Fotos, etc. Solo desactiva si no usas estas aplicaciones.",
          command:
            'netsh advfirewall firewall set rule group="Connect" new enable=no\nnetsh advfirewall firewall set rule group="Contact Support" new enable=no\nnetsh advfirewall firewall set rule group="Cortana" new enable=no\nnetsh advfirewall firewall set rule group="DiagTrack" new enable=no\nnetsh advfirewall firewall set rule group="Feedback Hub" new enable=no\nnetsh advfirewall firewall set rule group="Microsoft Photos" new enable=no\nnetsh advfirewall firewall set rule group="OneNote" new enable=no\nnetsh advfirewall firewall set rule group="Remote Assistance" new enable=no\nnetsh advfirewall firewall set rule group="Windows Spotlight" new enable=no',
          language: "powershell",
        },
      ],
    },
    {
      id: "block-smb-port",
      name: "Bloquear Puerto SMB 445",
      description:
        "Bloquea tráfico SMB entrante en el puerto 445 para prevenir ataques de ransomware",
      benefit:
        "Mejora significativamente la seguridad bloqueando el vector de ataque principal para ransomware y gusanos",
      impactLevel: "high" as const,
      subsections: [
        {
          title: "Bloquear Puerto 445",
          content:
            "Añade regla de firewall para bloquear tráfico SMB entrante. El puerto 445 de SMB es frecuentemente objetivo de WannaCry, Petya y otros ransomware.",
          command:
            "netsh advfirewall firewall add rule name=deny445 dir=in action=block protocol=TCP localport=445",
          language: "powershell",
        },
        {
          title: "Nota de Seguridad",
          content:
            "El puerto 445 es el vector principal para la propagación de ransomware en redes Windows. Se recomienda bloquearlo a menos que requieras comparticiones SMB.",
          type: "warning",
        },
      ],
    },
    {
      id: "firewall-profiles",
      name: "Configurar Perfiles de Firewall",
      description:
        "Habilita firewall en todos los perfiles y restringe reglas de firewall locales",
      benefit:
        "Asegura protección consistente del firewall en todos los escenarios de red",
      impactLevel: "high" as const,
      subsections: [
        {
          title: "Habilitar Perfiles de Firewall",
          content:
            "Habilita Windows Firewall en perfiles Domain, Public y Private. Desallows local firewall rule modifications to prevent tampering.",
          command:
            "Set-NetFirewallProfile -Profile Domain,Public,Private -Enabled True -AllowLocalFirewallRules False",
          language: "powershell",
        },
        {
          title: "Protección",
          content:
            "Previene que el malware desactive el firewall o cree excepciones para acceso de red.",
          type: "info",
        },
      ],
    },
    {
      id: "disable-netbios",
      name: "Desactivar NetBIOS y LMHOSTS",
      description:
        "Desactiva el protocolo legacy NetBIOS que puede exponer información del sistema",
      benefit:
        "Reduce la exposición de nombres de equipo y ataques de descubrimiento de red",
      impactLevel: "medium" as const,
      subsections: [
        {
          title: "Desactivar NetBIOS/LMHOSTS",
          content:
            "NetBIOS es un protocolo legacy que difunde nombres de equipo en redes locales. Los sistemas modernos usan DNS en su lugar.",
          command:
            'New-ItemProperty -Force -Path "HKLM:\\SYSTEM\\CurrentControlSet\\Services\\NetBT\\Parameters" -Name "EnableLMHOSTS" -PropertyType DWord -Value 0',
          language: "powershell",
        },
      ],
    },
    {
      id: "disable-network-adapters",
      name: "Desactivar Adaptadores de Red Innecesarios",
      description:
        "Desactiva componentes de red no utilizados como Pacer, Servidor SMB, LLDP y LLTD",
      benefit:
        "Reduce la exposición de red y elimina servicios de red potencialmente vulnerables",
      impactLevel: "medium" as const,
      subsections: [
        {
          title: "Desactivar Componentes de Red",
          content:
            "Desactiva Pacer (QoS), Servidor SMB, LLDP (Link Layer Discovery Protocol) y LLTD (Link-Layer Topology Discovery). Estos rara vez son necesarios para juegos o productividad.",
          command:
            '# Pacer (QoS)\nDisable-NetAdapterBinding -Name "*" -ComponentID "ms_pacer"\n\n# Servidor SMB\nDisable-NetAdapterBinding -Name "*" -ComponentID "ms_server"\n\n# LLDP\nDisable-NetAdapterBinding -Name "*" -ComponentID "ms_lldp"\n\n# LLTD\nDisable-NetAdapterBinding -Name "*" -ComponentID "ms_lltdio"\nDisable-NetAdapterBinding -Name "*" -ComponentID "ms_rspndr"',
          language: "powershell",
        },
      ],
    },
    {
      id: "disable-ipv6",
      name: "Desactivar IPv6",
      description: "Desactiva protocolo IPv6 si solo usas IPv4",
      benefit:
        "Reduce la complejidad de red y brechas de seguridad potenciales de protocolos no utilizados",
      impactLevel: "low" as const,
      subsections: [
        {
          title: "Desactivar IPv6",
          content:
            "Desactiva IPv6 en adaptadores de red. Solo desactiva si tu red usa exclusivamente IPv4. Algunas aplicaciones pueden requerir IPv6.",
          command:
            'Disable-NetAdapterBinding -Name "*" -ComponentID "ms_tcpip6"\nNew-ItemProperty -Force -Path "HKLM:\\SYSTEM\\CurrentControlSet\\Services\\TCPIP6\\Parameters" -Name "DisabledComponents" -PropertyType DWord -Value 0xFFFFFFFF',
          language: "powershell",
        },
        {
          title: "Advertencia",
          content:
            "Solo desactiva si usas exclusivamente IPv4. Desactivar IPv6 puede romper algunas aplicaciones o servicios que dependen de él.",
          type: "warning",
        },
      ],
    },
    {
      id: "disable-smbv1",
      name: "Desactivar Protocolo SMBv1",
      description:
        "Desactiva el protocolo de compartición de archivos inseguro SMBv1",
      benefit: "Elimina el vector de ataque de ransomware WannaCry y Petya",
      impactLevel: "high" as const,
      subsections: [
        {
          title: "Desactivar SMBv1",
          content:
            "SMBv1 tiene vulnerabilidades críticas y debe ser siempre desactivado. Los sistemas modernos usan SMB2/3.",
          command:
            'Set-ItemProperty -Path "HKLM:\\SYSTEM\\CurrentControlSet\\Services\\LanmanServer\\Parameters" -Name SMB1 -Value 0',
          language: "powershell",
        },
        {
          title: "Crítica de Seguridad",
          content:
            "SMBv1 ha sido explotado por ataques de ransomware mayores. Se recomienda desactivarlo.",
          type: "warning",
        },
      ],
    },
    {
      id: "disable-file-printer-sharing",
      name: "Desactivar Compartición de Archivos e Impresoras",
      description:
        "Desactiva reglas de firewall para compartición de archivos e impresoras si no es necesaria",
      benefit:
        "Previene acceso no autorizado a archivos compartidos e impresoras en la red",
      impactLevel: "medium" as const,
      subsections: [
        {
          title: "Desactivar Reglas de Compartición",
          content:
            "Desactiva reglas de firewall que permiten compartición de archivos e impresoras. Solo desactiva si no compartes archivos o impresoras en tu red.",
          command:
            'netsh advfirewall firewall set rule group="File and Printer Sharing" new enable=no',
          language: "powershell",
        },
        {
          title: "Impacto",
          content:
            "Si usas compartición de archivos/impresoras de red, necesitarás habilitar estas reglas por separado.",
          type: "info",
        },
      ],
    },
    {
      id: "credential-hardening",
      name: "Endurecimiento de Credenciales",
      description:
        "Configura políticas de tokens y credenciales para prevenir ataques de robo de credenciales",
      benefit:
        "Protege tokens de administrador de ataques de escalada de privilegios locales",
      impactLevel: "high" as const,
      subsections: [
        {
          title: "Habilitar Protección de Credenciales",
          content:
            "Habilita endurecimiento del Control de Cuentas de Usuario (UAC), filtrado de tokens de administrador y políticas de tokens de cuentas locales. Previene robo de credenciales por suplantación de tokens.",
          command:
            "Set-ItemProperty HKLM:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\System -Name LocalAccountTokenFilterPolicy -Value 0\nSet-ItemProperty HKLM:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\System -Name FilterAdministratorToken -Value 1\nSet-ItemProperty HKLM:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\System -Name EnableLUA -Value 1",
          language: "powershell",
        },
        {
          title: "Efecto de UAC",
          content:
            "Asegura que UAC solicite confirmación para todas las operaciones administrativas, previniendo escalada silenciosa de privilegios.",
          type: "info",
        },
      ],
    },
    {
      id: "cleartext-password-protection",
      name: "Protección de Contraseñas en Texto Plano",
      description:
        "Previene el almacenamiento de contraseñas en texto plano y habilita detección de fuga de tokens",
      benefit:
        "Previene ataques de recolección de credenciales que explotan almacenamiento de contraseñas en texto plano",
      impactLevel: "high" as const,
      subsections: [
        {
          title: "Desactivar Contraseñas en Texto Plano",
          content:
            "Desactiva almacenamiento de contraseñas en texto plano de WDigest y habilita detección de fuga de tokens. WDigest almacena contraseñas en memoria en texto plano, creando riesgo de seguridad severo.",
          command:
            "Set-ItemProperty HKLM:\\SYSTEM\\CurrentControlSet\\Control\\SecurityProviders\\WDigest -Name UseLogonCredential -Value 0\nSet-ItemProperty HKLM:\\SYSTEM\\CurrentControlSet\\Control\\Lsa -Name TokenLeakDetectDelaySecs -Value 30",
          language: "powershell",
        },
        {
          title: "Crítica de Seguridad",
          content:
            "Las contraseñas en texto plano de WDigest permiten atacantes recolectar credenciales usando herramientas como Mimikatz después de comprometer el sistema.",
          type: "warning",
        },
      ],
    },
  ] as Tweak[],
};
