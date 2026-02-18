import { useState, useEffect } from 'react'
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { Activity, Users, Calendar, Image, TrendingUp, AlertCircle } from 'lucide-react'
import './App.css'

function App() {
  const [apiErrorsData, setApiErrorsData] = useState([])
  const [apiLatencyData, setApiLatencyData] = useState([])
  const [newUsersData, setNewUsersData] = useState([])
  const [createdEventsData, setCreatedEventsData] = useState([])
  const [mediaPerEventData, setMediaPerEventData] = useState([])
  const [activeSessionsData, setActiveSessionsData] = useState([])
  
  const [selectedApi, setSelectedApi] = useState('all')
  const [selectedErrorType, setSelectedErrorType] = useState('all')
  const [timeRange, setTimeRange] = useState('30')

  useEffect(() => {
    // Carregar dados dos arquivos CSV
    loadCSVData()
  }, [])

  const loadCSVData = async () => {
    try {
      // Simulação de carregamento de dados CSV
      // Em produção, você usaria fetch ou import para carregar os arquivos
      
      // Dados de erro da API
      const errorsResponse = await fetch('/src/assets/api_errors.csv')
      const errorsText = await errorsResponse.text()
      const errorsRows = parseCSV(errorsText)
      setApiErrorsData(errorsRows)

      // Dados de latência da API
      const latencyResponse = await fetch('/src/assets/api_latency.csv')
      const latencyText = await latencyResponse.text()
      const latencyRows = parseCSV(latencyText)
      setApiLatencyData(latencyRows)

      // Dados de novos usuários
      const usersResponse = await fetch('/src/assets/new_users.csv')
      const usersText = await usersResponse.text()
      const usersRows = parseCSV(usersText)
      setNewUsersData(usersRows)

      // Dados de eventos criados
      const eventsResponse = await fetch('/src/assets/created_events.csv')
      const eventsText = await eventsResponse.text()
      const eventsRows = parseCSV(eventsText)
      setCreatedEventsData(eventsRows)

      // Dados de mídia por evento
      const mediaResponse = await fetch('/src/assets/media_per_event.csv')
      const mediaText = await mediaResponse.text()
      const mediaRows = parseCSV(mediaText)
      setMediaPerEventData(mediaRows)

      // Dados de sessões ativas
      const sessionsResponse = await fetch('/src/assets/active_sessions.csv')
      const sessionsText = await sessionsResponse.text()
      const sessionsRows = parseCSV(sessionsText)
      setActiveSessionsData(sessionsRows)
    } catch (error) {
      console.error('Erro ao carregar dados:', error)
      // Usar dados de exemplo se o carregamento falhar
      generateSampleData()
    }
  }

  const parseCSV = (text) => {
    const lines = text.trim().split('\n')
    const headers = lines[0].split(',')
    return lines.slice(1).map(line => {
      const values = line.split(',')
      const obj = {}
      headers.forEach((header, index) => {
        obj[header] = values[index]
      })
      return obj
    })
  }

  const generateSampleData = () => {
    // Gerar dados de exemplo para demonstração
    const dates = Array.from({ length: 30 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - (29 - i))
      return date.toISOString().split('T')[0]
    })

    // Erros da API
    const errors = dates.flatMap(date => [
      { Data: date, API: '/api/upload-media', Tipo_Erro: '5xx', Taxa_Erro: (Math.random() * 0.04 + 0.001).toFixed(4) },
      { Data: date, API: '/api/upload-media', Tipo_Erro: '4xx', Taxa_Erro: (Math.random() * 0.04 + 0.001).toFixed(4) },
      { Data: date, API: '/api/events/:id', Tipo_Erro: '5xx', Taxa_Erro: (Math.random() * 0.04 + 0.001).toFixed(4) },
      { Data: date, API: '/api/events/:id', Tipo_Erro: '4xx', Taxa_Erro: (Math.random() * 0.04 + 0.001).toFixed(4) }
    ])
    setApiErrorsData(errors)

    // Latência da API
    const latency = dates.flatMap(date => [
      { Data: date, API: '/api/upload-media', Latencia_ms: (Math.random() * 400 + 50).toFixed(2) },
      { Data: date, API: '/api/events/:id', Latencia_ms: (Math.random() * 400 + 50).toFixed(2) }
    ])
    setApiLatencyData(latency)

    // Novos usuários
    const users = dates.map(date => ({
      Data: date,
      Novos_Usuarios: Math.floor(Math.random() * 150 + 50)
    }))
    setNewUsersData(users)

    // Eventos criados
    const events = dates.map(date => ({
      Data: date,
      Eventos_Criados: Math.floor(Math.random() * 80 + 20)
    }))
    setCreatedEventsData(events)

    // Mídia por evento
    const media = dates.map(date => ({
      Data: date,
      Media_por_Evento: (Math.random() * 13 + 2).toFixed(2)
    }))
    setMediaPerEventData(media)

    // Sessões ativas
    const sessions = dates.map(date => ({
      Data: date,
      Sessoes_Ativas: Math.floor(Math.random() * 1200 + 300)
    }))
    setActiveSessionsData(sessions)
  }

  // Filtrar dados de erro da API
  const filteredErrorData = apiErrorsData.filter(item => {
    if (selectedApi !== 'all' && item.API !== selectedApi) return false
    if (selectedErrorType !== 'all' && item.Tipo_Erro !== selectedErrorType) return false
    return true
  })

  // Agregar dados de erro por data
  const aggregatedErrorData = filteredErrorData.reduce((acc, item) => {
    const existing = acc.find(x => x.Data === item.Data)
    if (existing) {
      existing.Taxa_Erro = (parseFloat(existing.Taxa_Erro) + parseFloat(item.Taxa_Erro)).toFixed(4)
    } else {
      acc.push({ ...item })
    }
    return acc
  }, [])

  // Filtrar dados de latência
  const filteredLatencyData = apiLatencyData.filter(item => {
    if (selectedApi !== 'all' && item.API !== selectedApi) return false
    return true
  })

  // Calcular métricas resumidas
  const totalUsers = newUsersData.reduce((sum, item) => sum + parseInt(item.Novos_Usuarios || 0), 0)
  const totalEvents = createdEventsData.reduce((sum, item) => sum + parseInt(item.Eventos_Criados || 0), 0)
  const avgMedia = mediaPerEventData.length > 0 
    ? (mediaPerEventData.reduce((sum, item) => sum + parseFloat(item.Media_por_Evento || 0), 0) / mediaPerEventData.length).toFixed(2)
    : 0
  const avgSessions = activeSessionsData.length > 0
    ? Math.floor(activeSessionsData.reduce((sum, item) => sum + parseInt(item.Sessoes_Ativas || 0), 0) / activeSessionsData.length)
    : 0

  const avgErrorRate = aggregatedErrorData.length > 0
    ? ((aggregatedErrorData.reduce((sum, item) => sum + parseFloat(item.Taxa_Erro || 0), 0) / aggregatedErrorData.length) * 100).toFixed(2)
    : 0

  const avgLatency = filteredLatencyData.length > 0
    ? (filteredLatencyData.reduce((sum, item) => sum + parseFloat(item.Latencia_ms || 0), 0) / filteredLatencyData.length).toFixed(2)
    : 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-3">
            <Activity className="h-10 w-10 text-blue-600" />
            Dashboard SnapShare
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Monitoramento de métricas e indicadores do pipeline de dados
          </p>
        </div>

        {/* Tabs principais */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="backend">Saúde do Backend</TabsTrigger>
            <TabsTrigger value="engagement">Engajamento</TabsTrigger>
          </TabsList>

          {/* Visão Geral */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total de Usuários</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalUsers.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">Últimos 30 dias</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Eventos Criados</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalEvents.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">Últimos 30 dias</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Mídia por Evento</CardTitle>
                  <Image className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{avgMedia}</div>
                  <p className="text-xs text-muted-foreground">Média de fotos/vídeos</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Sessões Ativas</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{avgSessions.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">Média diária</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Novos Usuários</CardTitle>
                  <CardDescription>Crescimento de usuários nos últimos 30 dias</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={newUsersData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="Data" 
                        tickFormatter={(value) => new Date(value).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}
                      />
                      <YAxis />
                      <Tooltip 
                        labelFormatter={(value) => new Date(value).toLocaleDateString('pt-BR')}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="Novos_Usuarios" 
                        stroke="#3b82f6" 
                        fill="#3b82f6" 
                        fillOpacity={0.6}
                        name="Novos Usuários"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Eventos Criados</CardTitle>
                  <CardDescription>Número de eventos criados diariamente</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={createdEventsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="Data" 
                        tickFormatter={(value) => new Date(value).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}
                      />
                      <YAxis />
                      <Tooltip 
                        labelFormatter={(value) => new Date(value).toLocaleDateString('pt-BR')}
                      />
                      <Bar 
                        dataKey="Eventos_Criados" 
                        fill="#10b981" 
                        name="Eventos Criados"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Saúde do Backend */}
          <TabsContent value="backend" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Taxa de Erro Média</CardTitle>
                  <AlertCircle className="h-4 w-4 text-red-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{avgErrorRate}%</div>
                  <p className="text-xs text-muted-foreground">Meta: &lt; 1%</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Latência Média</CardTitle>
                  <Activity className="h-4 w-4 text-yellow-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{avgLatency} ms</div>
                  <p className="text-xs text-muted-foreground">Tempo de resposta</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Taxa de Erro da API</CardTitle>
                <CardDescription>Porcentagem de requisições com erro</CardDescription>
                <div className="flex gap-4 mt-4">
                  <Select value={selectedApi} onValueChange={setSelectedApi}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Selecione a API" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas as APIs</SelectItem>
                      <SelectItem value="/api/upload-media">/api/upload-media</SelectItem>
                      <SelectItem value="/api/events/:id">/api/events/:id</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={selectedErrorType} onValueChange={setSelectedErrorType}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Tipo de erro" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os erros</SelectItem>
                      <SelectItem value="5xx">Erros 5xx (Servidor)</SelectItem>
                      <SelectItem value="4xx">Erros 4xx (Cliente)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={aggregatedErrorData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="Data" 
                      tickFormatter={(value) => new Date(value).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}
                    />
                    <YAxis 
                      tickFormatter={(value) => `${(value * 100).toFixed(2)}%`}
                    />
                    <Tooltip 
                      labelFormatter={(value) => new Date(value).toLocaleDateString('pt-BR')}
                      formatter={(value) => `${(value * 100).toFixed(2)}%`}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="Taxa_Erro" 
                      stroke="#ef4444" 
                      strokeWidth={2}
                      name="Taxa de Erro"
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Latência de Requisições</CardTitle>
                <CardDescription>Tempo médio de resposta das APIs</CardDescription>
                <div className="flex gap-4 mt-4">
                  <Select value={selectedApi} onValueChange={setSelectedApi}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Selecione a API" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas as APIs</SelectItem>
                      <SelectItem value="/api/upload-media">/api/upload-media</SelectItem>
                      <SelectItem value="/api/events/:id">/api/events/:id</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <AreaChart data={filteredLatencyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="Data" 
                      tickFormatter={(value) => new Date(value).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}
                    />
                    <YAxis 
                      label={{ value: 'Latência (ms)', angle: -90, position: 'insideLeft' }}
                    />
                    <Tooltip 
                      labelFormatter={(value) => new Date(value).toLocaleDateString('pt-BR')}
                      formatter={(value) => `${parseFloat(value).toFixed(2)} ms`}
                    />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="Latencia_ms" 
                      stroke="#f59e0b" 
                      fill="#f59e0b" 
                      fillOpacity={0.6}
                      name="Latência (ms)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Engajamento */}
          <TabsContent value="engagement" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Mídia por Evento</CardTitle>
                  <CardDescription>Média de fotos e vídeos enviados por evento</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={mediaPerEventData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="Data" 
                        tickFormatter={(value) => new Date(value).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}
                      />
                      <YAxis />
                      <Tooltip 
                        labelFormatter={(value) => new Date(value).toLocaleDateString('pt-BR')}
                        formatter={(value) => parseFloat(value).toFixed(2)}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="Media_por_Evento" 
                        stroke="#8b5cf6" 
                        strokeWidth={2}
                        name="Mídia por Evento"
                        dot={{ r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Sessões Ativas</CardTitle>
                  <CardDescription>Número de usuários ativos diariamente</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={activeSessionsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="Data" 
                        tickFormatter={(value) => new Date(value).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}
                      />
                      <YAxis />
                      <Tooltip 
                        labelFormatter={(value) => new Date(value).toLocaleDateString('pt-BR')}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="Sessoes_Ativas" 
                        stroke="#06b6d4" 
                        fill="#06b6d4" 
                        fillOpacity={0.6}
                        name="Sessões Ativas"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Comparação de Métricas de Engajamento</CardTitle>
                <CardDescription>Novos usuários vs Eventos criados</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="Data" 
                      data={newUsersData}
                      tickFormatter={(value) => new Date(value).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}
                    />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip 
                      labelFormatter={(value) => new Date(value).toLocaleDateString('pt-BR')}
                    />
                    <Legend />
                    <Line 
                      yAxisId="left"
                      type="monotone" 
                      dataKey="Novos_Usuarios" 
                      data={newUsersData}
                      stroke="#3b82f6" 
                      strokeWidth={2}
                      name="Novos Usuários"
                      dot={{ r: 3 }}
                    />
                    <Line 
                      yAxisId="right"
                      type="monotone" 
                      dataKey="Eventos_Criados" 
                      data={createdEventsData}
                      stroke="#10b981" 
                      strokeWidth={2}
                      name="Eventos Criados"
                      dot={{ r: 3 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default App

