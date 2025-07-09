# Floodify SLZ

# Alerta de Alagamentos para São Luís 🌧️📡

Este projeto visa o desenvolvimento de um sistema distribuído para **monitoramento de alagamentos** na cidade de **São Luís - MA**, utilizando a plataforma **ThingsBoard**. O sistema coleta dados de sensores de nível d'água, conectados a placas **ESP32**, e envia os dados utilizando **MQTT** para a plataforma de IoT, promovendo respostas rápidas e eficazes para a gestão de riscos urbanos.

## 📁 Repositório
🔗 [Clique aqui para acessar o repositório no GitHub](https://github.com/luc4svale/floodify-slz)

## 👨‍💻 Equipe
- **Andre Moura Lima**  
- **Antonio Lucas da Silva Vale**  
- **Jeysraelly Almone da Silva**  
- **Victor Coelho da Silva**

## 🧭 Estrutura do Projeto

### Etapas Principais:
| Etapa | Descrição | Status |
|-------|-----------|--------|
| 1. Pesquisa e Planejamento | Estudo sobre sensores, protocolos e viabilidade técnica. | ✅ Concluída |
| 2. Aquisição de Componentes | Simulações iniciais com Wokwi e escolha do ESP32. | ✅ Concluída |
| 3. Estudo de Middlewares | Análise de plataformas: ThingsBoard e InterSCity. | ✅ Concluída |
| 4. Montagem do Protótipo | Circuito com sensor de nível | ✅ Concluída |
| 5. Desenvolvimento do Código | Programação para leitura e envio dos dados via MQTT | ✅ Concluída |
| 6. Testes de Campo | Verificação dos dados e ajustes. | ✅ Concluída |
| 7. Montagem Final | Acabamento físico e testes de estabilidade. | 🔲 Pendente |
| 8. Documentação e Apresentação | Relatório, fluxogramas e vídeo demonstrativo. | 🔲 Pendente |

## 🛠️ Tecnologias Utilizadas
- **ThingsBoard** (Plataforma de IoT)
- **ESP32** (Microcontrolador IoT)
- **MQTT** (Protocolo de Comunicação)
- **Arduino IDE**
- **Wokwi** (Simulação de circuitos)
- **GitHub** (Controle de versão e hospedagem do código)

## 🕒 Justificativa de Atrasos
Durante o planejamento, houve a necessidade de substituir a plataforma **ThingSpeak**, inicialmente cogitada, por **ThingsBoard**, devido a limitações de customização e integração. O tempo investido em testes e reavaliação foi essencial para assegurar a robustez e escalabilidade da solução final.

## 🎯 Objetivos
- Monitorar os níveis de água em áreas críticas de São Luís.
- Integrar sensores físicos a uma plataforma distribuída via rede MQTT.
- Promover uma cidade mais inteligente, resiliente e preparada para desastres.

## 📌 Conclusão
O projeto segue com a adoção oficial do **ThingsBoard**, aproveitando sua compatibilidade com o ESP32 e seu suporte a sistemas distribuídos. O cronograma atualizado será acompanhado através de Gráficos de Gantt, com o objetivo de garantir a entrega completa e funcional da solução proposta.

---

> Projeto desenvolvido como parte da disciplina **Sistemas Distribuídos (EECP0021)** - Engenharia da Computação - UFMA.
