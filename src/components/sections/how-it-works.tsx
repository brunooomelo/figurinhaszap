import { motion } from "framer-motion"
import { MousePointerClick, Upload, Sliders, Phone } from "lucide-react"

const steps = [
  {
    icon: MousePointerClick,
    title: 'Clique em "Criar"',
    description: "Inicie o processo com um simples clique",
    color: "bg-zinc-700",
  },
  {
    icon: Upload,
    title: "Envie sua imagem",
    description: "Do celular ou computador",
    color: "bg-zinc-700",
  },
  {
    icon: Sliders,
    title: "Ajuste (opcional)",
    description: "Personalize sua figurinha",
    color: "bg-zinc-700",
  },
  {
    icon: Phone,
    title: "Receba no Whatsapp",
    description: "Sua figurinha pronto para usar",
    color: "bg-zinc-700",
  },
]

export const HowItWorks = () => {
  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Como Funciona?</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="relative"
            >

              {/* Card */}
              <div className="group relative bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                {/* Icon Background */}
                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-5 rounded-xl bg-gradient-to-br ${step.color} transition-opacity duration-300`}
                />

                {/* Icon */}
                <div className={`mb-4 inline-flex p-3 rounded-lg bg-gradient-to-br ${step.color}`}>
                  <step.icon className="w-6 h-6 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold mb-2 text-gray-900">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>

              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}