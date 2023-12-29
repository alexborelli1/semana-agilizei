#language: pt

Funcionalidade: Cadastro

    Como usuário, desejo realizar um cadastro
    Para que possa acessar o sistema

Cenario: Cadastro de novo usuário
    Dado que acesso o site
    Quando informar meus dados
    E Salvar
    Entao devo ser cadastrado com sucesso

    # Given / Dado   --> contexto
    # When / Quando  --> acão executada
    # Then / Entao   --> resultado esperado
    # And / E        --> continuidade do passo anterior