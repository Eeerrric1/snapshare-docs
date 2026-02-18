# Dashboard SnapShare - Documentação

## Visão Geral

O **Dashboard SnapShare** é um painel interativo de visualização de métricas e indicadores desenvolvido para monitorar o pipeline de dados do projeto SnapShare. Este dashboard permite acompanhar a saúde do sistema backend e o engajamento dos usuários de forma intuitiva e visual.

## Objetivo

Traduzir os dados coletados pelo pipeline em conhecimento útil, permitindo que a equipe técnica e de produto tome decisões baseadas em dados concretos sobre a performance e o uso da plataforma SnapShare.

## Tecnologias Utilizadas

O dashboard foi desenvolvido utilizando tecnologias modernas de desenvolvimento web:

- **React 18**: Framework JavaScript para construção de interfaces de usuário
- **Vite**: Build tool e servidor de desenvolvimento rápido
- **Recharts**: Biblioteca de visualização de dados para React
- **Tailwind CSS**: Framework CSS utility-first para estilização
- **Shadcn/UI**: Biblioteca de componentes UI profissionais e acessíveis
- **Lucide React**: Biblioteca de ícones modernos

## Estrutura do Dashboard

O dashboard está organizado em três seções principais, acessíveis através de abas:

### 1. Visão Geral

A aba **Visão Geral** apresenta um resumo executivo das principais métricas do projeto, incluindo:

#### Cards de Métricas Resumidas

- **Total de Usuários**: Número total de novos usuários cadastrados nos últimos 30 dias
- **Eventos Criados**: Quantidade total de eventos criados na plataforma nos últimos 30 dias
- **Mídia por Evento**: Média de fotos e vídeos enviados por evento
- **Sessões Ativas**: Média diária de usuários ativos na plataforma

#### Gráficos de Tendência

- **Novos Usuários**: Gráfico de área mostrando o crescimento de usuários ao longo do tempo
- **Eventos Criados**: Gráfico de barras exibindo o número de eventos criados diariamente

### 2. Saúde do Backend

A aba **Saúde do Backend** monitora a performance técnica do sistema, incluindo:

#### Indicadores de Performance

- **Taxa de Erro Média**: Porcentagem média de requisições que retornam erros (meta: < 1%)
- **Latência Média**: Tempo médio de resposta das APIs em milissegundos

#### Gráfico de Taxa de Erro da API

Este gráfico de linha permite visualizar a taxa de erro ao longo do tempo, com filtros interativos para:

- **Filtro de API**: Permite selecionar entre todas as APIs ou APIs específicas:
  - `/api/upload-media` (upload de arquivos)
  - `/api/events/:id` (carregamento de eventos)
  
- **Filtro de Tipo de Erro**: Permite filtrar por tipo de erro:
  - Todos os erros
  - Erros 5xx (erros de servidor)
  - Erros 4xx (erros de cliente)

#### Gráfico de Latência de Requisições

Gráfico de área mostrando o tempo de resposta das APIs ao longo do tempo, com filtro de API para análise específica.

### 3. Engajamento

A aba **Engajamento** apresenta métricas relacionadas ao uso e adoção da plataforma:

#### Gráficos de Engajamento

- **Mídia por Evento**: Gráfico de linha mostrando a média de fotos e vídeos enviados por evento ao longo do tempo
- **Sessões Ativas**: Gráfico de área exibindo o número de usuários ativos diariamente
- **Comparação de Métricas**: Gráfico de linha duplo comparando novos usuários versus eventos criados

## Métricas e Indicadores

### Indicadores de Saúde do Sistema (Backend)

Estes indicadores informam se a plataforma está estável e se os usuários conseguem usá-la sem problemas técnicos.

#### Taxa de Erro da API

**Descrição**: Porcentagem de requisições que retornam um código de erro 5xx (erros de servidor) ou 4xx (erros do cliente).

**Por que é importante?**: Uma alta taxa de erro indica que algo está quebrado, seja no código ou em como os usuários estão interagindo com a plataforma. A meta é manter essa taxa o mais perto de 0% possível.

**Principais APIs monitoradas**:
- `POST /api/upload-media` (upload de arquivos)
- `GET /api/events/:id` (carregamento da página de evento)

#### Latência de Requisições

**Descrição**: Tempo que o backend leva para responder a uma requisição.

**Por que é importante?**: Requisições lentas prejudicam a experiência do usuário. É necessário garantir que o upload e o carregamento da galeria de fotos sejam rápidos.

### Indicadores de Uso e Engajamento (Negócio)

Estes indicadores ajudam a entender se o SnapShare está sendo adotado e usado da forma planejada.

#### Número de Novos Usuários

**Descrição**: Quantos novos usuários se cadastram por dia ou semana.

**Por que é importante?**: É a métrica mais básica de crescimento. Se o número de usuários está crescendo, a estratégia de divulgação inicial está funcionando.

#### Número de Eventos Criados

**Descrição**: Quantos novos eventos são criados na plataforma por dia ou semana.

**Por que é importante?**: A criação de eventos é a principal ação dos usuários "Organizadores". Este é o primeiro e mais importante funil de conversão.

#### Mídia Enviada por Evento

**Descrição**: Média de fotos e vídeos enviados para cada evento criado.

**Por que é importante?**: Esta métrica mede a colaboração, que é a principal proposta de valor. Ela indica se os participantes estão realmente usando a plataforma para contribuir com conteúdo.

#### Sessões Ativas Diárias (ou semanais)

**Descrição**: Número de usuários que acessam a plataforma em um período.

**Por que é importante?**: Mostra a retenção e o engajamento. Se os usuários voltam, significa que eles acham a plataforma útil e valiosa.

## Como Usar o Dashboard

### Navegação

1. **Acesse o dashboard** através do navegador web
2. **Selecione uma aba** no topo da página (Visão Geral, Saúde do Backend ou Engajamento)
3. **Interaja com os filtros** disponíveis em cada seção para refinar a visualização dos dados

### Filtros Interativos

Os filtros permitem análises mais detalhadas dos dados:

- **Filtro de API**: Clique no botão de seleção para escolher qual API deseja monitorar
- **Filtro de Tipo de Erro**: Selecione o tipo de erro específico para análise focada
- Os gráficos são atualizados automaticamente quando os filtros são alterados

### Interpretação dos Gráficos

- **Gráficos de Linha**: Mostram tendências ao longo do tempo, úteis para identificar padrões e anomalias
- **Gráficos de Área**: Destacam o volume e a magnitude das métricas
- **Gráficos de Barras**: Facilitam a comparação entre diferentes períodos
- **Tooltips**: Passe o mouse sobre os pontos dos gráficos para ver valores exatos

## Instalação e Execução

### Pré-requisitos

- Node.js versão 18 ou superior
- pnpm (gerenciador de pacotes)

### Instalação

```bash
# Clone o repositório ou acesse o diretório do projeto
cd snapshare-dashboard

# Instale as dependências (já instaladas durante a criação)
pnpm install
```

### Executar em Desenvolvimento

```bash
# Inicie o servidor de desenvolvimento
pnpm run dev

# O dashboard estará disponível em http://localhost:5173
```

### Build para Produção

```bash
# Gere os arquivos otimizados para produção
pnpm run build

# Os arquivos serão gerados no diretório 'dist'
```

### Deploy

O dashboard pode ser implantado em qualquer serviço de hospedagem estática, como:

- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Azure Static Web Apps

## Estrutura de Arquivos

```
snapshare-dashboard/
├── src/
│   ├── assets/              # Arquivos CSV com dados de exemplo
│   │   ├── api_errors.csv
│   │   ├── api_latency.csv
│   │   ├── new_users.csv
│   │   ├── created_events.csv
│   │   ├── media_per_event.csv
│   │   └── active_sessions.csv
│   ├── components/
│   │   └── ui/              # Componentes UI do Shadcn
│   ├── App.jsx              # Componente principal do dashboard
│   ├── App.css              # Estilos globais
│   ├── main.jsx             # Ponto de entrada da aplicação
│   └── index.css            # Estilos base
├── public/                  # Arquivos públicos estáticos
├── index.html               # HTML principal
├── package.json             # Dependências do projeto
└── vite.config.js           # Configuração do Vite
```

## Dados de Exemplo

O dashboard utiliza dados de exemplo gerados para demonstração. Os arquivos CSV estão localizados em `src/assets/` e contêm:

- **api_errors.csv**: Taxa de erro por data, API e tipo de erro
- **api_latency.csv**: Latência em milissegundos por data e API
- **new_users.csv**: Número de novos usuários por data
- **created_events.csv**: Número de eventos criados por data
- **media_per_event.csv**: Média de mídia por evento por data
- **active_sessions.csv**: Número de sessões ativas por data

### Integração com Dados Reais

Para integrar o dashboard com dados reais do pipeline, você pode:

1. **Substituir os arquivos CSV** por dados reais exportados do banco de dados
2. **Implementar uma API REST** que forneça os dados em formato JSON
3. **Conectar diretamente ao banco de dados** usando uma camada backend
4. **Usar ferramentas de monitoramento** como Prometheus e Grafana Loki (conforme mencionado no documento Sprint2)

## Próximos Passos e Melhorias

### Funcionalidades Futuras

1. **Integração com Prometheus e Grafana Loki**: Conectar o dashboard aos sistemas de monitoramento reais
2. **Alertas em Tempo Real**: Notificações quando métricas ultrapassam limites críticos
3. **Exportação de Relatórios**: Permitir download de relatórios em PDF ou Excel
4. **Comparação de Períodos**: Adicionar funcionalidade para comparar métricas entre diferentes períodos
5. **Dashboards Personalizados**: Permitir que usuários criem suas próprias visualizações
6. **Modo Escuro**: Implementar tema escuro para melhor visualização em ambientes com pouca luz
7. **Atualização em Tempo Real**: WebSockets para atualização automática dos dados
8. **Análise Preditiva**: Usar machine learning para prever tendências futuras

### Melhorias de Performance

1. **Lazy Loading**: Carregar componentes sob demanda
2. **Caching**: Implementar cache de dados para reduzir requisições
3. **Paginação**: Para grandes volumes de dados históricos
4. **Otimização de Gráficos**: Virtualização para grandes conjuntos de dados

## Suporte e Contribuição

Para dúvidas, sugestões ou contribuições:

1. Abra uma issue no repositório do projeto
2. Entre em contato com a equipe de desenvolvimento
3. Consulte a documentação do Sprint2_PI.pdf para mais contexto sobre o projeto

## Conclusão

O Dashboard SnapShare fornece uma visão abrangente e interativa das métricas críticas do projeto, permitindo que a equipe monitore a saúde do sistema e o engajamento dos usuários de forma eficiente. Com sua interface intuitiva e visualizações claras, o dashboard se torna uma ferramenta essencial para a tomada de decisões baseadas em dados.

---

**Versão**: 1.0.0  
**Data**: Outubro 2025  
**Equipe**: Caio Hierro Basilio, Eric Campos Teixeira, Douglas Gomes, Marcela Rabêlo, Ramon Mesquita

