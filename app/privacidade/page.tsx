import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Privacidade | Concierge Brasil",
  description: "Política de Privacidade da Concierge Brasil Facilities Services conforme LGPD.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-navy-900 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="text-gold-500 text-sm hover:underline mb-6 inline-block"
          >
            ← Voltar ao site
          </Link>
          <h1 className="font-display text-4xl md:text-5xl text-white mb-2">
            POLÍTICA DE PRIVACIDADE
          </h1>
          <p className="text-white/50">
            Última atualização: {new Date().toLocaleDateString("pt-BR")}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-4xl">
        <div className="prose prose-gray max-w-none space-y-8 text-gray-700 leading-relaxed">

          <section>
            <h2 className="font-display text-2xl text-navy-900 mb-3">1. INTRODUÇÃO</h2>
            <p>
              A <strong>Concierge Brasil Facilities Services</strong> está comprometida com a
              proteção da privacidade e dos dados pessoais de seus usuários, em conformidade com
              a <strong>Lei Geral de Proteção de Dados (LGPD) — Lei nº 13.709/2018</strong>.
            </p>
            <p>
              Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e
              protegemos suas informações pessoais ao utilizar nosso site.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-navy-900 mb-3">2. DADOS COLETADOS</h2>
            <p>Coletamos apenas os dados necessários para atender à sua solicitação:</p>
            <ul className="list-disc ml-6 mt-3 space-y-2">
              <li><strong>Nome completo</strong> — para identificação</li>
              <li><strong>Telefone / WhatsApp</strong> — para retorno de contato</li>
              <li><strong>Nome do condomínio ou empresa</strong> — para personalização do atendimento</li>
              <li><strong>Mensagem</strong> — para entender sua necessidade</li>
              <li><strong>Dados de navegação</strong> (cookies essenciais) — para funcionamento técnico do site</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl text-navy-900 mb-3">3. FINALIDADE DO USO</h2>
            <p>Utilizamos seus dados exclusivamente para:</p>
            <ul className="list-disc ml-6 mt-3 space-y-2">
              <li>Responder ao seu contato e elaborar proposta de serviços</li>
              <li>Agendar visita técnica gratuita</li>
              <li>Enviar informações relevantes sobre nossos serviços (mediante seu consentimento)</li>
              <li>Melhorar a qualidade de nosso atendimento</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl text-navy-900 mb-3">4. BASE LEGAL (LGPD)</h2>
            <p>
              O tratamento de seus dados se baseia no <strong>consentimento livre e explícito</strong>{" "}
              (Art. 7°, I da LGPD) fornecido ao preencher nosso formulário, e no{" "}
              <strong>legítimo interesse</strong> para execução de pré-contrato (Art. 7°, V).
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-navy-900 mb-3">5. COMPARTILHAMENTO DE DADOS</h2>
            <p>
              <strong>Não vendemos, alugamos ou cedemos seus dados a terceiros.</strong>{" "}
              Seus dados podem ser compartilhados apenas com prestadores de serviço técnico
              (hospedagem, envio de e-mail) estritamente necessários para a operação do site,
              sob acordos de confidencialidade.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-navy-900 mb-3">6. ARMAZENAMENTO E SEGURANÇA</h2>
            <p>
              Seus dados são armazenados em servidores seguros com criptografia SSL/TLS.
              Adotamos medidas técnicas e administrativas para proteger suas informações contra
              acesso não autorizado, perda ou alteração.
            </p>
            <p className="mt-3">
              Os dados são retidos pelo período necessário para atendimento da solicitação ou
              conforme exigência legal, após o qual são excluídos com segurança.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-navy-900 mb-3">7. SEUS DIREITOS (LGPD)</h2>
            <p>Você tem direito a:</p>
            <ul className="list-disc ml-6 mt-3 space-y-2">
              <li>Confirmar a existência de tratamento dos seus dados</li>
              <li>Acessar seus dados pessoais</li>
              <li>Corrigir dados incompletos, inexatos ou desatualizados</li>
              <li>Solicitar a anonimização, bloqueio ou eliminação de dados desnecessários</li>
              <li>Revogar o consentimento a qualquer momento</li>
              <li>Obter informações sobre o compartilhamento de dados</li>
            </ul>
            <p className="mt-4">
              Para exercer esses direitos, entre em contato pelo e-mail:{" "}
              <a
                href="mailto:conciergeconservacao@gmail.com"
                className="text-gold-600 hover:underline font-semibold"
              >
                conciergeconservacao@gmail.com
              </a>
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-navy-900 mb-3">8. COOKIES</h2>
            <p>
              Utilizamos <strong>cookies essenciais</strong> necessários para o funcionamento
              básico do site (como preservar suas preferências de cookies). Não utilizamos
              cookies de rastreamento ou publicidade sem seu consentimento explícito.
            </p>
            <p className="mt-3">
              Você pode gerenciar ou desabilitar cookies nas configurações do seu navegador,
              porém isso pode afetar a funcionalidade do site.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-navy-900 mb-3">9. ALTERAÇÕES DESTA POLÍTICA</h2>
            <p>
              Esta Política pode ser atualizada periodicamente. Recomendamos a revisão regular
              desta página. Alterações significativas serão comunicadas em destaque no site.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-navy-900 mb-3">10. CONTATO DO CONTROLADOR</h2>
            <p>
              <strong>Concierge Brasil Facilities Services</strong>
              <br />
              E-mail:{" "}
              <a href="mailto:conciergeconservacao@gmail.com" className="text-gold-600 hover:underline">
                conciergeconservacao@gmail.com
              </a>
              <br />
              Instagram:{" "}
              <a
                href="https://www.instagram.com/conciergeconservacao"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold-600 hover:underline"
              >
                @conciergeconservacao
              </a>
            </p>
          </section>

          <div className="mt-12 p-6 bg-navy-900/5 border border-navy-900/10 rounded-xl">
            <p className="text-sm text-gray-500">
              Em caso de dúvidas sobre o tratamento de seus dados, você também pode contatar a
              Autoridade Nacional de Proteção de Dados (ANPD) em{" "}
              <strong>www.gov.br/anpd</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
