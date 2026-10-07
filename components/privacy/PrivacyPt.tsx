import Link from "next/link";
import { lp } from "@/lib/i18n";
import { SITE } from "@/lib/site";

export const PRIVACY_UPDATED_PT = "6 de outubro de 2026";

// Portuguese (Portugal) version of the Privacy & Cookies page. Keep in step with PrivacyEn.tsx.
export function PrivacyPt() {
  return (
    <section className="s-sec prose">
      <h1 className="s-h big2">Privacidade e Cookies</h1>
      <p className="mut">Última atualização: {PRIVACY_UPDATED_PT}</p>

      <p>
        Esta página explica que dados pessoais a <span translate="no">{SITE.name}</span> (&laquo;nós&raquo;) recolhe através deste site, porquê, e as escolhas de que dispõe. Estamos
        sediados em <span translate="no">{SITE.address}</span>. Procuramos cumprir a Lei de Proteção de Dados Pessoais Digitais de 2023 (Digital Personal Data Protection Act, 2023, Índia) e, para os
        visitantes da Europa e do Reino Unido, o RGPD e o RGPD do Reino Unido (UK GDPR).
      </p>

      <h2>1. O que recolhemos</h2>
      <h3>Quando nos envia um pedido</h3>
      <p>
        Se utilizar o formulário &laquo;Pedir orçamento&raquo; ou o formulário da nossa página de <Link href={lp("pt", "/contacts")}>Contactos</Link>, recebemos os dados que escrever: o seu nome, o nome da
        empresa (opcional), o endereço de e-mail, o número de telemóvel, o país, o assunto que escolher (apenas na página de Contactos) e o pedido ou a mensagem que redigir. Utilizamo-los
        apenas para responder ao seu pedido e, se for caso disso, preparar uma proposta.
      </p>
      <p>
        O site não guarda uma cópia do seu pedido. É enviado por e-mail para a nossa equipa comercial e fica depois nas caixas de correio da empresa, como qualquer outro e-mail que recebemos.
      </p>

      <h3>Quando navega no site</h3>
      <p>
        O nosso fornecedor de alojamento regista informação técnica básica quando uma página é pedida, como o seu endereço IP, o tipo de navegador e a página que pediu. Esta informação é
        utilizada para gerir e proteger o site. Se aceitar cookies de análise (ver abaixo), recolhemos também estatísticas sobre a utilização do site.
      </p>

      <h2>2. Cookies e tecnologias semelhantes</h2>
      <p>
        Na primeira visita, um aviso pergunta se aceita cookies que medem a utilização do site. <strong>A análise está desativada até clicar em Aceitar.</strong> Não utilizamos cookies
        publicitários.
      </p>
      <div className="scroll">
        <table>
          <thead>
            <tr><th>Nome</th><th>Definido por</th><th>Finalidade</th><th>Precisa do seu consentimento?</th></tr>
          </thead>
          <tbody>
            <tr><td>_ga, _ga_*</td><td>Google Analytics (através do Google Tag Manager)</td><td>Conta as visitas e mostra quais as páginas lidas, de forma agregada</td><td>Sim</td></tr>
            <tr><td>pkt-consent</td><td>Este site (guardado no seu navegador)</td><td>Memoriza a sua escolha de cookies durante 180 dias</td><td>Não, é necessário para respeitar a sua escolha</td></tr>
            <tr><td>pkt-promo-seen</td><td>Este site (guardado no seu navegador, apagado quando o separador é fechado)</td><td>Evita que a janela de novidades volte a aparecer enquanto navega</td><td>Não</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        <strong>Google Maps.</strong> O rodapé tem uma ligação &laquo;Ver no Google Maps&raquo;. Nada é carregado a partir da Google até clicar nela; abre depois num novo separador, sujeita às políticas da própria Google.
      </p>
      <p>
        <strong>Ligações para outros sites.</strong> As nossas páginas têm ligações para o LinkedIn e para paikane.com. Esses sites têm as suas próprias políticas de privacidade.
      </p>
      <p>
        Pode mudar de ideias a qualquer momento através da ligação <em>Definições de cookies</em> no rodapé, ou limpando os dados deste site no seu navegador.
      </p>

      <h2>3. Quem vê os seus dados</h2>
      <ul>
        <li>A nossa equipa comercial e de assistência, que recebe os pedidos por e-mail.</li>
        <li>Os prestadores de serviços que gerem o site e o nosso e-mail: a Vercel (alojamento) e a Google (e-mail Workspace e, se tiver aceitado os cookies, Analytics).</li>
        <li>Não vendemos os seus dados pessoais.</li>
      </ul>
      <p>
        Estes prestadores operam a nível global, pelo que os seus dados podem ser tratados fora da Índia, incluindo nos Estados Unidos. Recorremos a prestadores que aplicam garantias reconhecidas.
      </p>

      <h2>4. Durante quanto tempo os conservamos</h2>
      <p>
        Conservamos os e-mails com pedidos durante o tempo necessário para tratar o seu pedido e para os nossos registos comerciais habituais, e depois eliminamo-los. Os dados de análise são
        conservados pela Google durante o período definido na nossa conta Analytics.
      </p>

      <h2>5. Os seus direitos</h2>
      <p>
        Pode pedir-nos que lhe indiquemos que dados pessoais temos sobre si, que os corrijamos ou que os eliminemos, e pode retirar o consentimento que tenha dado. Se estiver na UE ou no Reino
        Unido, pode também opor-se ao tratamento ou pedir a sua limitação e apresentar reclamação junto da autoridade de proteção de dados do seu país (em Portugal, a CNPD, Comissão Nacional de
        Proteção de Dados). Para exercer qualquer um destes direitos, escreva-nos para a morada abaixo. Responderemos num prazo razoável.
      </p>

      <h2>6. Contacto</h2>
      <p translate="no">
        {SITE.name}<br />
        {SITE.address}<br />
        E-mail: <a href={`mailto:${SITE.email}`}>{SITE.email}</a><br />
        Telefone: <a href={`tel:${SITE.phoneHref}`}>{SITE.phone}</a>
      </p>

      <h2>7. Alterações a esta página</h2>
      <p>
        Podemos atualizar esta página de tempos a tempos. A data no topo indica quando foi alterada pela última vez.
      </p>

      <p><Link href={lp("pt", "/")} className="arrow">Voltar ao início →</Link></p>
    </section>
  );
}
