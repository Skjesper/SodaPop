import ConfiguratorClient from "../../components/ConfiguratorClient";

export default function ConfiguratorPage() {
  return <ConfiguratorClient />;
}

export const metadata = {
  title: "3D Model Configurator",
  description: "Interactive 3D model configurator",
  keywords: ["3D", "configurator", "model", "customization"],
  openGraph: {
    title: "3D Model Configurator",
    description: "Interactive 3D model configurator",
    type: "website",
  },
};
