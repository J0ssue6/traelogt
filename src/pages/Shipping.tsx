function Shipping() {
  return (
    <main className="container mx-auto max-w-4xl px-4 py-12">
      <div className="space-y-10">
        <header className="space-y-3">
          <h1 className="text-3xl font-bold tracking-tight">
            Envíos y Entregas
          </h1>
          <p className="text-muted-foreground">
            Realizamos entregas en Los Amates, Izabal y ofrecemos una opción
            gratuita de recogida en Mariscos.
          </p>
        </header>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Opciones de entrega</h2>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border p-6 space-y-3">
              <h3 className="text-lg font-semibold">Entrega a domicilio</h3>

              <p className="text-2xl font-bold">Q50</p>

              <p className="text-muted-foreground leading-7">
                Recibe tu pedido directamente en la dirección que indiques al
                realizar tu compra.
              </p>
            </div>

            <div className="rounded-lg border p-6 space-y-3">
              <h3 className="text-lg font-semibold">Drop-off en Los Amates</h3>

              <p className="text-2xl font-bold">Q25</p>

              <p className="text-muted-foreground leading-7">
                Recibe tu pedido en un punto de entrega dentro de Los Amates,
                Izabal, Guatemala.
              </p>
            </div>

            <div className="rounded-lg border p-6 space-y-3">
              <h3 className="text-lg font-semibold">Recogida en Mariscos</h3>

              <p className="text-2xl font-bold">Gratis</p>

              <p className="text-muted-foreground leading-7">
                Recoge tu pedido en Farmacia Daly, ubicada en Mariscos, Los
                Amates, Izabal.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            1. Entrega a domicilio — Q50
          </h2>

          <p className="text-muted-foreground leading-7">
            Con esta opción llevamos tu pedido directamente a la dirección que
            proporciones durante el proceso de compra.
          </p>

          <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
            <li>
              Costo de envío: <strong>Q50</strong>.
            </li>
            <li>
              Debes proporcionar una dirección de entrega correcta y completa.
            </li>
            <li>
              También recomendamos proporcionar un número de teléfono para
              facilitar la coordinación de la entrega.
            </li>
            <li>
              El cliente debe estar disponible para recibir el pedido o
              coordinar con nosotros cuando sea necesario.
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            2. Drop-off en Los Amates — Q25
          </h2>

          <p className="text-muted-foreground leading-7">
            Esta opción permite recibir tu pedido mediante un punto de entrega
            dentro de Los Amates, Izabal.
          </p>

          <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
            <li>
              Costo de entrega: <strong>Q25</strong>.
            </li>
            <li>La entrega se realizará en el punto de drop-off acordado.</li>
            <li>
              Te contactaremos cuando tu pedido esté listo para ser entregado.
            </li>
            <li>
              Es importante proporcionar un número de teléfono válido para poder
              coordinar la entrega.
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            3. Recogida en Farmacia Daly — Gratis
          </h2>

          <p className="text-muted-foreground leading-7">
            Si te encuentras en Mariscos, puedes recoger tu pedido sin costo
            adicional en <strong>Farmacia Daly</strong>, ubicada en Mariscos,
            Los Amates, Izabal.
          </p>

          <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
            <li>
              Costo: <strong>Q0</strong>.
            </li>
            <li>Tu pedido debe estar confirmado y listo antes de recogerlo.</li>
            <li>Espera nuestra confirmación antes de acudir por tu pedido.</li>
            <li>
              Te recomendamos llevar el nombre utilizado para realizar el pedido
              o la confirmación de compra.
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Tiempos de entrega</h2>

          <p className="text-muted-foreground leading-7">
            Los tiempos de entrega pueden variar dependiendo de la cantidad de
            pedidos, disponibilidad de los productos, ubicación y otros factores
            logísticos.
          </p>

          <p className="text-muted-foreground leading-7">
            Una vez que tu pedido esté listo, podremos comunicarnos contigo para
            coordinar la entrega o confirmar que puedes pasar a recogerlo.
          </p>

          <p className="text-muted-foreground leading-7">
            Los tiempos indicados por nuestro equipo son estimados y pueden
            cambiar debido a circunstancias fuera de nuestro control, como
            condiciones climáticas, tráfico u otros inconvenientes logísticos.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Información importante</h2>

          <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
            <li>
              Verifica que tu información de contacto y entrega sea correcta
              antes de confirmar tu pedido.
            </li>
            <li>
              Podemos comunicarnos contigo por teléfono o WhatsApp para
              coordinar la entrega.
            </li>
            <li>
              Si no es posible completar una entrega debido a información
              incorrecta o a la ausencia del cliente, podremos solicitar una
              nueva coordinación de entrega.
            </li>
            <li>
              Los costos adicionales ocasionados por una nueva entrega, cuando
              correspondan, podrán ser responsabilidad del cliente.
            </li>
            <li>
              Las condiciones de envío pueden actualizarse cuando sea necesario.
              Cualquier cambio será publicado en esta página.
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            ¿Necesitas ayuda con tu entrega?
          </h2>

          <p className="text-muted-foreground leading-7">
            Si tienes alguna pregunta sobre las opciones de entrega, el estado
            de tu pedido o quieres coordinar una entrega, comunícate con
            nosotros a través de nuestros canales de contacto.
          </p>

          <div className="rounded-lg border p-5">
            <p className="font-medium">TraeloGT</p>
            <p className="text-muted-foreground">
              Los Amates, Izabal, Guatemala
            </p>
            <p className="text-muted-foreground">WhatsApp: +351 937 536 398</p>
            <p className="text-muted-foreground">
              Correo: jdiaz77711@gmail.com
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Shipping;
