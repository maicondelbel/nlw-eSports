-> Iniciar o projeto
# npm i vite@latest


-> TailwindCSS
# npm install -D tailwindcss postcss autoprefixer
# npx tailwindcss init -p
// Configurar a propriedade "contente" do arquivo tailwind.config.cjs para ler os arquivos JSX.
// Criar um arquivo /src/styles/main.css com as seguintes linhas: 
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  // Importar o arquivo main.css no componente principal (App)
  import './styles/main.css'

  // Para adicionar imagem de fundo, liner-gradient, font-family.... precisa setar as informações no arquivo tailwind.config.cjs


  -> Componentes Crus (sem estilização) do React com uma biblioteca
  # npm install @radix-ui/-----nome do componente------

  