import { siteConfig } from "@/config/site";

function Contact() {
  return (
    <main className="container mx-auto max-w-4xl px-4 py-12">
      <div className="space-y-10">
        <header className="space-y-3">
          <h1 className="text-3xl font-bold tracking-tight">Contáctanos</h1>
          <p className="text-muted-foreground leading-7">
            ¿Tienes alguna pregunta sobre un producto, pedido o entrega? Estamos
            aquí para ayudarte.
          </p>
        </header>

        <section className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border p-6 space-y-3">
            <h2 className="text-xl font-semibold">WhatsApp</h2>

            <p className="text-muted-foreground leading-7">
              La forma más rápida de comunicarte con nosotros es por WhatsApp.
              Puedes escribirnos para consultar sobre productos, pedidos,
              entregas o cualquier otra pregunta.
            </p>

            <a
              href="https://wa.me/351937536398"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Escribir por WhatsApp
            </a>
          </div>

          <div className="rounded-lg border p-6 space-y-3">
            <h2 className="text-xl font-semibold">Correo electrónico</h2>

            <p className="text-muted-foreground leading-7">
              También puedes comunicarte con nosotros por correo electrónico.
              Intentaremos responder lo antes posible.
            </p>

            <a
              href="mailto:jdiaz77711@gmail.com"
              className="font-medium text-primary hover:underline"
            >
              jdiaz77711@gmail.com
            </a>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Atención al cliente</h2>

          <div className="rounded-lg border p-6 space-y-4">
            <div>
              <p className="font-medium">Ubicación</p>
              <p className="text-muted-foreground">
                Mariscos, Los Amates, Izabal, Guatemala
              </p>
            </div>

            <div>
              <p className="font-medium">Horario de atención</p>
              <p className="text-muted-foreground">
                Lunes a sábado: 9:00 AM – 6:00 PM
              </p>
              <p className="text-muted-foreground">Domingo: Cerrado</p>
            </div>

            <div>
              <p className="font-medium">WhatsApp</p>
              <p className="text-muted-foreground">+351 937 536 398</p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            ¿Tienes un problema con tu pedido?
          </h2>

          <p className="text-muted-foreground leading-7">
            Si necesitas ayuda con un pedido, por favor ten disponible tu número
            de pedido o el nombre utilizado al realizar la compra. Esto nos
            ayudará a encontrar tu pedido y atenderte más rápido.
          </p>

          <div className="rounded-lg border p-6">
            <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
              <li>Consulta sobre el estado de tu pedido.</li>
              <li>Preguntas sobre productos o disponibilidad.</li>
              <li>Problemas con una entrega.</li>
              <li>Productos dañados o incorrectos.</li>
              <li>Consultas sobre cambios, devoluciones o reembolsos.</li>
            </ul>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Recogida de pedidos</h2>

          <p className="text-muted-foreground leading-7">
            Si seleccionaste la opción de recogida gratuita, tus pedidos estarán
            disponibles en Farmacia Daly, en Mariscos, Los Amates, Izabal.
          </p>

          <p className="text-muted-foreground leading-7">
            Por favor espera nuestra confirmación antes de acudir a recoger tu
            pedido.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Redes sociales</h2>

          <p className="text-muted-foreground leading-7">
            También puedes seguirnos en nuestras redes sociales para conocer
            nuestras novedades, productos y promociones.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
            >
              Instagram
            </a>

            <a
              href={siteConfig.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
            >
              Facebook
            </a>
          </div>
        </section>

        <section className="rounded-lg border bg-muted/30 p-6">
          <h2 className="text-xl font-semibold">
            ¿No encuentras lo que buscas?
          </h2>

          <p className="mt-2 text-muted-foreground leading-7">
            Escríbenos por WhatsApp y con gusto te ayudaremos con cualquier
            pregunta relacionada con nuestra tienda, productos, pedidos o
            entregas.
          </p>
        </section>
      </div>
    </main>
  );
}

export default Contact;
