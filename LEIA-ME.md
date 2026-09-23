# Clínica LaMont — site completo

Landing page em HTML, CSS e JavaScript. Responsiva para celular, tablet e computador, sem instalação e sem banco de dados.

## Abrir o site

Extraia o ZIP inteiro e abra `index.html` no navegador. Mantenha os arquivos e a pasta `assets` juntos. No projeto de desenvolvimento, os arquivos do site ficam em `dist/`; no ZIP eles ficam na pasta principal.

## Arquivos

| Arquivo | O que editar |
| --- | --- |
| `index.html` | Textos, nomes, registros, links, telefone e endereço |
| `styles.css` | Cores, tamanhos, espaçamento e responsividade |
| `conteudo.js` | Fotos dos profissionais e casos de antes e depois |
| `script.js` | Menu móvel e comparador de fotografias |
| `assets/profissionais/` | Fotografias reais da equipe |
| `assets/resultados/` | Pares de fotografias reais de antes e depois |
| `assets/sorriso-lamont.webp` | Imagem ilustrativa da abertura |

## Colocar as fotos dos profissionais

1. Salve a fotografia do Dr. Cainã como `assets/profissionais/dr-caina.jpg`.
2. Salve a fotografia da Dra. Júlia como `assets/profissionais/dra-julia.jpg`.
3. Abra `conteudo.js` e preencha os campos `foto`:

```js
caina: {
  foto: 'assets/profissionais/dr-caina.jpg',
  posicao: 'center top',
},
julia: {
  foto: 'assets/profissionais/dra-julia.jpg',
  posicao: 'center top',
  registro: '',
},
```

JPG, PNG e WEBP funcionam. Ajuste a extensão no caminho para corresponder ao arquivo. Prefira nomes sem espaços ou acentos. `posicao` controla o enquadramento, por exemplo `center top` ou `center 25%`.

Enquanto os caminhos estiverem vazios, os cartões mostram as iniciais CL e JM. Não foram usadas fotografias fictícias para representar os profissionais. O registro da Dra. Júlia não foi informado; o campo `registro` está pronto para ser preenchido.

## Adicionar um antes e depois

1. Coloque o par de fotos na pasta `assets/resultados/`.
2. Abra `conteudo.js`.
3. Dentro da lista `casos`, remova os marcadores de comentário `/*` e `*/` do exemplo e preencha os campos. Exemplo de estrutura:

```js
casos: [
  {
    titulo: 'Título do tratamento',
    descricao: 'Descrição breve do caso real.',
    antes: 'assets/resultados/caso-01-antes.jpg',
    depois: 'assets/resultados/caso-01-depois.jpg',
    altAntes: 'Descrição da fotografia antes do tratamento.',
    altDepois: 'Descrição da fotografia depois do tratamento.',
    profissional: 'Dr. Cainã Lachine',
    registro: 'CRO-RJ 49210',
    posicaoAntes: 'center',
    posicaoDepois: 'center',
  },
],
```

Para adicionar outros casos, copie o objeto entre `{` e `}` dentro da mesma lista, separando os objetos por vírgula. Cada caso gera um cartão com comparador deslizante, título, descrição e identificação do profissional. Os campos `descricao`, `profissional` e `registro` podem ficar vazios.

Use fotografias do mesmo caso, com enquadramento e proporção semelhantes. A área de comparação usa proporção 4:3. Os campos `posicaoAntes` e `posicaoDepois` ajustam o enquadramento. O controle funciona por toque, mouse e setas do teclado.

Sem casos cadastrados, a seção exibe “Novos registros em breve”. Não há resultados clínicos simulados. Se uma das imagens não carregar, o cartão mostra “Registro indisponível no momento”.

## Conteúdo incluído

- Dr. Cainã Lachine, responsável técnico — CRO-RJ 49210.
- Dra. Júlia Monteiro Lachine, com link para o Instagram informado.
- Clínica LaMont — EPAO 7059.
- Galeria configurável de antes e depois.
- Botões de WhatsApp, Instagram, localização e menu para celular.

Nomes de exibição foram obtidos dos perfis indicados. CRO-RJ e EPAO foram inseridos conforme os dados fornecidos pelo solicitante.

## Publicar em outra hospedagem

Envie `index.html`, `styles.css`, `conteudo.js`, `script.js` e a pasta `assets` para a pasta pública da hospedagem. Não é necessário Node, Flask ou outro servidor de aplicação. O contato abre o WhatsApp; não há formulário de coleta nem painel administrativo.

## Imagem e informações de contato

A fotografia da abertura é ilustrativa, gerada para esta apresentação, e não representa integrante da equipe ou paciente real. A marca tipográfica é uma proposta visual.

Contato comercial usado: (24) 98182-9116. Endereço: Av. Roberto Silveira, 311, Centro, Miguel Pereira/RJ. Referências consultadas em 22/09/2026:

- https://www.instagram.com/clinicalamont/
- https://www.instagram.com/dr.cainalachinee/
- https://www.instagram.com/drajuliamonteirolachine/
- https://cadeodentista.com.br/clinica/clinica-odontologica-lamont-implantes-e-estetica-em-miguel-pereira-paty-do-alferes-rj
- https://www.top-rated.online/cities/Miguel%2BPereira/place/p/13562665/Cl%C3%ADnica%2BOdontol%C3%B3gica%2BLaMont%2B-%2BImplantes%2Be%2BEst%C3%A9tica%2Bem%2BMiguel%2BPereira

O carregamento direto dos perfis do Instagram ficou indisponível; os nomes foram consultados nos resultados indexados. O telefone de atendimento coincide em dois diretórios; um cadastro empresarial exibe outro número. Horários específicos, depoimentos e notas não foram presumidos.
