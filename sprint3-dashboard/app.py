# Dashboard em si.

import streamlit as st
import pandas as pd
import plotly.express as px

st.set_page_config(page_title="SnapShare - Dashboard", layout="wide")

@st.cache_data
def load_data(path="data/sample_data.csv"):
    df = pd.read_csv(path, parse_dates=["date"])
    df = df.sort_values("date")
    return df

df = load_data()

# --- Sidebar ---

st.sidebar.header("Filtros")
start_date = st.sidebar.date_input("Data inicial", df["date"].min())
end_date = st.sidebar.date_input("Data final", df["date"].max())

mask = (df["date"] >= pd.to_datetime(start_date)) & (df["date"] <= pd.to_datetime(end_date))
df_f = df.loc[mask]

# --- Layout principal ---

st.title("SnapShare — Dashboard Operacional")
st.markdown("Acompanhamento de métricas e indicadores do pipeline de dados.")

k1, k2, k3, k4 = st.columns(4)
k1.metric("Novos Usuários", int(df_f["new_users"].sum()))
k2.metric("Eventos Criados", int(df_f["events_created"].sum()))
k3.metric("Mídias Enviadas", int(df_f["media_uploaded"].sum()))
k4.metric("Disponibilidade Média (%)", round(df_f["availability_percent"].mean(), 2))

st.markdown("---")

# --- Botões para exibir/ocultar gráficos ---
col_btn1, col_btn2 = st.columns(2)
show_growth = col_btn1.toggle("Mostrar Gráficos de Crescimento", value=True)
show_quality = col_btn2.toggle("Mostrar Gráficos de Qualidade", value=False)

# Limita a renderização ao estado dos botões
if show_growth:
    with st.container():
        st.subheader("📈 Crescimento e Engajamento")
        g1, g2 = st.columns(2)

        with g1:
            fig_users = px.bar(
                df_f, x="date", y="new_users",
                title="Novos Usuários por Semana",
                labels={"date": "Data", "new_users": "Usuários"}
            )
            st.plotly_chart(fig_users, use_container_width=True)

        with g2:
            fig_events = px.bar(
                df_f, x="date", y="events_created",
                title="Eventos Criados por Semana",
                labels={"date": "Data", "events_created": "Eventos"}
            )
            st.plotly_chart(fig_events, use_container_width=True)
        st.markdown("---")

if show_quality:
    with st.container():
        st.subheader("⚙️ Desempenho e Qualidade")
        g3, g4 = st.columns(2)
        df_f = df_f.assign(api_error_rate=df_f["api_errors"] / df_f["api_requests"] * 100)

        with g3:
            fig_latency = px.bar(
                df_f, x="date", y="avg_latency_ms",
                title="Latência Média (ms)",
                labels={"date": "Data", "avg_latency_ms": "Latência (ms)"}
            )
            st.plotly_chart(fig_latency, use_container_width=True)

        with g4:
            fig_errors = px.bar(
                df_f, x="date", y="api_error_rate",
                title="Taxa de Erro da API (%)",
                labels={"date": "Data", "api_error_rate": "Erro (%)"}
            )
            st.plotly_chart(fig_errors, use_container_width=True)
        st.markdown("---")


# --- Rodapé ---

st.caption("Os dados apresentados são sintéticos e foram gerados para fins de demonstração acadêmica.")
