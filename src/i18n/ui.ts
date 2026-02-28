export const languageList = {
  "pt-br": "Português (BR)",
  en: "English",
} as const;

export const labels = {
  "pt-br": {
    // =========== Navegação =========== //
    "nav.home": "Início",

    // =========== Footer =========== //
    "footer.explore": "Explorar",
    "footer.our_projects": "Nossos Projetos",
    "footer.connect": "Conectar",
    "footer.updates": "Atualizações",
    "footer.subscribe": "Inscrever-se",
    "footer.newsletter": "Receba novidades sobre projetos e funcionalidades",
    "footer.email.placeholder": "Email",
    "footer.copyright": "© 2026 Rustilian. Todos os direitos reservados.",
    "footer.privacy": "Privacidade",
    "footer.terms": "Termos",
    "footer.github.title": "Rustilian no GitHub",
    "footer.github.description": "Confira nossos projetos open source",
    "footer.github.star": "Dar estrela",

    // =========== Redes Sociais =========== //
    "aria.social.twitter": "Link para o Twitter da Rustilian",
    "aria.social.github": "Link para o GitHub da Rustilian",
    "aria.social.youtube": "Link para o YouTube da Rustilian",
    "aria.social.discord": "Link para o Discord da Rustilian",
    "aria.social.linkedin": "Link para o LinkedIn da Rustilian",
    "aria.social.reddit": "Link para o Reddit da Rustilian",

    // =========== Barra de Acessibilidade =========== //
    "accessibility.title": "Ferramentas de Acessibilidade",
    "accessibility.increase_text": "Aumentar texto",
    "accessibility.decrease_text": "Diminuir texto",
    "accessibility.grayscale": "Escala de cinza",
    "accessibility.high_contrast": "Alto contraste",
    "accessibility.negative_contrast": "Contraste negativo",
    "accessibility.underline_links": "Sublinhar links",
    "accessibility.readable_font": "Fonte legível",
    "accessibility.reset": "Redefinir",
    "accessibility.current_size": "Tamanho atual",

    // =========== Cookies =========== //
    "cookies.title": "USAMOS COOKIES",
    "cookies.message":
      "Utilizamos cookies próprios e de terceiros para melhorar sua experiência de navegação, analisar o tráfego do site e personalizar o conteúdo. Pode aceitar todos os cookies, rejeitá-los ou personalizar suas preferências.",
    "cookies.more_info": "Mais informações",
    "cookies.accept_all": "Aceitar todas",
    "cookies.reject_all": "Rejeitar todas",
    "cookies.customize": "Personalizar",

    // =========== Página Principal =========== //
    "home.title": "Início - Rustilian",
    "home.hero.tagline": "Arquitetura Backend de Alta Performance & Desenvolvimento em Rust",
    "home.hero.description":
      "A Rustilian constrói sistemas backend ultrarrápidos e confiáveis com Rust — de motores de trading a ferramentas de infraestrutura.",
    "home.hero.cta": "Explorar Projetos",
    "home.projects.title": "Nossos Projetos",
    "home.projects.subtitle":
      "Um portfólio de sistemas de alta performance construídos para o mundo real.",
    "home.orca_options.name": "ORCA Options",
    "home.orca_options.description":
      "Um sistema de negociação de opções de alta performance construído inteiramente em Rust. Projetado para execução de ordens com latência ultrabaixa, cálculo de Greeks em tempo real e gestão de risco robusta.",
    "home.orca_options.status": "Disponível",
    "home.orca_stocks.name": "ORCA Stocks",
    "home.orca_stocks.description":
      "A próxima evolução da suíte ORCA, trazendo a mesma arquitetura de baixa latência para o mercado de ações com roteamento de ordens avançado e processamento de dados de mercado.",
    "home.orca_stocks.status": "Em Desenvolvimento",
    "home.qltsys.name": "QLTSYS",
    "home.qltsys.description":
      "Uma aplicação backend robusta para gestão de manutenção de piscinas — agendamento, despacho de técnicos, controle de químicos e relatórios para clientes, tudo em um só sistema.",
    "home.qltsys.status": "Disponível",

    // =========== Privacidade =========== //
    "privacy.title": "Política de Privacidade",
    "privacy.updated": "Última atualização: 28 de fevereiro de 2026",
    "privacy.s1.title": "1. Quem somos",
    "privacy.s1.body": "A Rustilian é uma empresa de tecnologia especializada em sistemas backend de alta performance desenvolvidos em Rust. Este website (rustilian.com) é um portfólio público que apresenta os nossos projetos e serviços.",
    "privacy.s2.title": "2. Dados que coletamos",
    "privacy.s2.body": "Este é um website estático. Não coletamos dados pessoais através de formulários de registro ou contas de usuário.",
    "privacy.s2.list": "Podemos coletar os seguintes dados de forma limitada:",
    "privacy.s2.item1.label": "Cookies de preferência",
    "privacy.s2.item1.body": "armazenamos localmente o seu consentimento de cookies e preferências de acessibilidade (modo claro/escuro, tamanho de texto). Estes dados nunca saem do seu dispositivo.",
    "privacy.s2.item2.label": "Dados de acesso",
    "privacy.s2.item2.body": "o servidor web pode registrar endereços IP, tipo de navegador e páginas acessadas para fins de diagnóstico e segurança. Estes registros são retidos pelo período mínimo necessário.",
    "privacy.s3.title": "3. Cookies",
    "privacy.s3.body1": "Utilizamos cookies estritamente necessários para recordar as suas preferências de consentimento e acessibilidade. Ao visitar o nosso website pela primeira vez, será apresentado um aviso de cookies onde poderá aceitar, rejeitar ou personalizar as suas preferências.",
    "privacy.s3.body2": "Não utilizamos cookies de rastreamento de terceiros nem publicidade comportamental.",
    "privacy.s4.title": "4. Partilha de dados",
    "privacy.s4.body": "Não vendemos, alugamos nem compartilhamos os seus dados pessoais com terceiros.",
    "privacy.s5.title": "5. Os seus direitos",
    "privacy.s5.body": "Nos termos do RGPD e legislação aplicável, você tem o direito de acessar, corrigir ou solicitar a eliminação dos seus dados pessoais. Para exercer estes direitos, contacte-nos através de contact@rustilian.com.",
    "privacy.s6.title": "6. Alterações a esta política",
    "privacy.s6.body": "Podemos atualizar esta política periodicamente. A data de última atualização no topo desta página indica quando foi revista pela última vez. A utilização continuada do website após alterações constitui aceitação da política atualizada.",
    "privacy.s7.title": "7. Contato",
    "privacy.s7.body": "Para questões relacionadas com privacidade, contacte:",

    // =========== Termos =========== //
    "terms.title": "Termos de Utilização",
    "terms.updated": "Última atualização: 28 de fevereiro de 2026",
    "terms.s1.title": "1. Aceitação dos termos",
    "terms.s1.body": "Ao acessar e utilizar rustilian.com, você aceita ficar vinculado(a) por estes Termos de Utilização. Caso não concorde com algum dos termos aqui presentes, deverá deixar de utilizar o website.",
    "terms.s2.title": "2. Utilização do website",
    "terms.s2.body": "Este website é disponibilizado exclusivamente para fins informativos. Você se compromete a:",
    "terms.s2.item1": "Não utilizar o website para qualquer fim ilegal ou não autorizado;",
    "terms.s2.item2": "Não tentar obter acesso não autorizado a qualquer parte do website ou aos seus sistemas;",
    "terms.s2.item3": "Não transmitir vírus, código malicioso ou qualquer outra tecnologia prejudicial.",
    "terms.s3.title": "3. Propriedade intelectual",
    "terms.s3.body1": "Todo o conteúdo deste website — incluindo textos, logotipos, imagens e código — é propriedade da Rustilian ou dos respectivos autores, e está protegido pelas leis de direitos autorais aplicáveis.",
    "terms.s3.body2": "O código-fonte deste website é disponibilizado sob a Licença MIT. Os direitos autorais do design e conteúdo original pertencem à Rustilian.",
    "terms.s3.license": "Licença MIT",
    "terms.s4.title": "4. Isenção de responsabilidade",
    "terms.s4.body": "Este website é fornecido tal como está, sem garantias de qualquer tipo, expressas ou implícitas. A Rustilian não garante que o website estará sempre disponível, isento de erros ou completamente atualizado.",
    "terms.s5.title": "5. Limitação de responsabilidade",
    "terms.s5.body": "Na máxima extensão permitida por lei, a Rustilian não será responsável por quaisquer danos diretos, indiretos, incidentais ou consequentes resultantes da utilização ou impossibilidade de utilização deste website.",
    "terms.s6.title": "6. Links externos",
    "terms.s6.body": "Este website pode conter links para websites de terceiros. Estes links são fornecidos apenas para conveniência. A Rustilian não controla nem se responsabiliza pelo conteúdo ou práticas de privacidade desses websites.",
    "terms.s7.title": "7. Alterações aos termos",
    "terms.s7.body": "Reservamo-nos o direito de modificar estes termos a qualquer momento. A data de última atualização no topo desta página indica a versão mais recente. A utilização continuada do website após alterações constitui aceitação dos novos termos.",
    "terms.s8.title": "8. Contato",
    "terms.s8.body": "Para questões relacionadas com estes termos, contacte:",
  },
  en: {
    // =========== Navigation =========== //
    "nav.home": "Home",

    // =========== Footer =========== //
    "footer.explore": "Explore",
    "footer.our_projects": "Our Projects",
    "footer.connect": "Connect",
    "footer.updates": "Updates",
    "footer.subscribe": "Subscribe",
    "footer.newsletter": "Receive updates about new projects and features",
    "footer.email.placeholder": "Email",
    "footer.copyright": "© 2026 Rustilian. All rights reserved.",
    "footer.privacy": "Privacy",
    "footer.terms": "Terms",
    "footer.github.title": "Rustilian on GitHub",
    "footer.github.description": "Check out our open-source projects",
    "footer.github.star": "Star us",

    // =========== Social Media =========== //
    "aria.social.twitter": "Link to Rustilian Twitter",
    "aria.social.github": "Link to Rustilian GitHub",
    "aria.social.youtube": "Link to Rustilian YouTube",
    "aria.social.discord": "Link to Rustilian Discord",
    "aria.social.linkedin": "Link to Rustilian LinkedIn",
    "aria.social.reddit": "Link to Rustilian Reddit",

    // =========== Accessibility Toolbar =========== //
    "accessibility.title": "Accessibility Tools",
    "accessibility.increase_text": "Increase text",
    "accessibility.decrease_text": "Decrease text",
    "accessibility.grayscale": "Grayscale",
    "accessibility.high_contrast": "High contrast",
    "accessibility.negative_contrast": "Negative contrast",
    "accessibility.underline_links": "Underline links",
    "accessibility.readable_font": "Readable font",
    "accessibility.reset": "Reset",
    "accessibility.current_size": "Current size",

    // =========== Cookies =========== //
    "cookies.title": "WE USE COOKIES",
    "cookies.message":
      "We use our own and third-party cookies to improve your browsing experience, analyze site traffic, and personalize content. You can accept all cookies, reject them, or customize your preferences.",
    "cookies.more_info": "More information",
    "cookies.accept_all": "Accept all",
    "cookies.reject_all": "Reject all",
    "cookies.customize": "Customize",

    // =========== Home Page =========== //
    "home.title": "Home - Rustilian",
    "home.hero.tagline": "High-Performance Backend Architecture & Rust Development",
    "home.hero.description":
      "Rustilian crafts blazing-fast, reliable backend systems using Rust — from trading engines to infrastructure tooling.",
    "home.hero.cta": "Explore Projects",
    "home.projects.title": "Our Projects",
    "home.projects.subtitle":
      "A curated portfolio of high-performance systems built for the real world.",
    "home.orca_options.name": "ORCA Options",
    "home.orca_options.description":
      "A high-performance options trading system built entirely in Rust. Designed for ultra-low latency order execution, real-time Greeks calculation, and robust risk management.",
    "home.orca_options.status": "Ready",
    "home.orca_stocks.name": "ORCA Stocks",
    "home.orca_stocks.description":
      "The next evolution of the ORCA suite, bringing the same low-latency architecture to equity markets with advanced order routing and market-data processing.",
    "home.orca_stocks.status": "In Development",
    "home.qltsys.name": "QLTSYS",
    "home.qltsys.description":
      "A robust backend application for pool maintenance management — scheduling, technician dispatch, chemical tracking, and client reporting all in one system.",
    "home.qltsys.status": "Ready",

    // =========== Privacy =========== //
    "privacy.title": "Privacy Policy",
    "privacy.updated": "Last updated: February 28, 2026",
    "privacy.s1.title": "1. Who we are",
    "privacy.s1.body": "Rustilian is a technology company specialising in high-performance backend systems written in Rust. This website (rustilian.com) is a public portfolio presenting our projects and services.",
    "privacy.s2.title": "2. Data we collect",
    "privacy.s2.body": "This is a static website. We do not collect personal data through registration forms or user accounts.",
    "privacy.s2.list": "We may collect the following data in a limited fashion:",
    "privacy.s2.item1.label": "Preference cookies",
    "privacy.s2.item1.body": "we store your cookie consent choice and accessibility preferences (light/dark mode, text size) locally on your device. This data never leaves your device.",
    "privacy.s2.item2.label": "Server access logs",
    "privacy.s2.item2.body": "the web server may log IP addresses, browser type, and pages accessed for diagnostic and security purposes. These logs are retained for the minimum period necessary.",
    "privacy.s3.title": "3. Cookies",
    "privacy.s3.body1": "We use strictly necessary cookies to remember your consent and accessibility preferences. When you first visit our website, a cookie banner will allow you to accept, reject, or customise your preferences.",
    "privacy.s3.body2": "We do not use third-party tracking cookies or behavioural advertising.",
    "privacy.s4.title": "4. Data sharing",
    "privacy.s4.body": "We do not sell, rent, or share your personal data with third parties.",
    "privacy.s5.title": "5. Your rights",
    "privacy.s5.body": "Under applicable data protection law, you have the right to access, correct, or request deletion of your personal data. To exercise these rights, contact us at contact@rustilian.com.",
    "privacy.s6.title": "6. Changes to this policy",
    "privacy.s6.body": "We may update this policy from time to time. The last updated date at the top of this page indicates when it was last revised. Continued use of the website after changes constitutes acceptance of the updated policy.",
    "privacy.s7.title": "7. Contact",
    "privacy.s7.body": "For privacy-related questions, contact:",

    // =========== Terms =========== //
    "terms.title": "Terms of Use",
    "terms.updated": "Last updated: February 28, 2026",
    "terms.s1.title": "1. Acceptance of terms",
    "terms.s1.body": "By accessing and using rustilian.com, you agree to be bound by these Terms of Use. If you do not agree with any part of these terms, you should discontinue use of the website.",
    "terms.s2.title": "2. Use of the website",
    "terms.s2.body": "This website is provided for informational purposes only. You agree to:",
    "terms.s2.item1": "Not use the website for any unlawful or unauthorised purpose;",
    "terms.s2.item2": "Not attempt to gain unauthorised access to any part of the website or its systems;",
    "terms.s2.item3": "Not transmit viruses, malicious code, or any other harmful technology.",
    "terms.s3.title": "3. Intellectual property",
    "terms.s3.body1": "All content on this website — including text, logos, images, and code — is the property of Rustilian or the respective authors, and is protected by applicable copyright laws.",
    "terms.s3.body2": "The source code of this website is made available under the MIT License. Copyright of the original design and content belongs to Rustilian.",
    "terms.s3.license": "MIT License",
    "terms.s4.title": "4. Disclaimer of warranties",
    "terms.s4.body": "This website is provided as is, without warranties of any kind, either express or implied. Rustilian does not guarantee that the website will be available at all times, error-free, or fully up to date.",
    "terms.s5.title": "5. Limitation of liability",
    "terms.s5.body": "To the fullest extent permitted by law, Rustilian shall not be liable for any direct, indirect, incidental, or consequential damages arising from the use or inability to use this website.",
    "terms.s6.title": "6. External links",
    "terms.s6.body": "This website may contain links to third-party websites. These links are provided for convenience only. Rustilian has no control over and accepts no responsibility for the content or privacy practices of those websites.",
    "terms.s7.title": "7. Changes to these terms",
    "terms.s7.body": "We reserve the right to modify these terms at any time. The last updated date at the top of this page reflects the most current version. Continued use of the website after changes constitutes acceptance of the updated terms.",
    "terms.s8.title": "8. Contact",
    "terms.s8.body": "For questions regarding these terms, contact:",
  },
};
