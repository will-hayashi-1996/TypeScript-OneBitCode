
let usuarios=[]


interface GithubUserResponse {
    id: number
    login: string
    name: string
    bio: string
    public_repos: number
    repos_url: string
    message?: "Not Found"
  }
  
  interface GithubRepoResponse {
    name: string
    description: string
    fork: boolean
    stargazers_count: number
  }



async function getFromApi(usuario: string){

    

    let response=  await fetch('https://api.github.com/users/'+usuario)

    let aux: GithubUserResponse = await response.json()

    if(aux.message){

        alert('Usuário não encontrado!');


    }else{

        usuarios.push(aux)

        return aux
    }

    

}

function findUser(name: string) {

    const user = usuarios.find(user => user.login === name)
  
    // Utilizando o operador nullish coalescing podemos
    // garantir que nosso retorno será um tipo Union
    return user ?? false
  }


 async function getInfoFromUser(user:string){


        let aux: GithubUserResponse=findUser(user)


        console.log('id do usuário ' + aux.id )
        console.log('login do usuário ' + aux.login )
        console.log('nome do usuário ' + aux.name )
        console.log('bio do usuário ' + aux.bio )
        console.log('repoósitorio público do usuário ' + aux.public_repos )
        console.log(' url repoósitorio público do usuário ' + aux.repos_url )
        console.log(' do repósitório desse usuário, temos as seguintes informações:')

        let response=  await fetch('https://api.github.com/users/'+aux.login+'/repos')

        let aux2: GithubRepoResponse[] = await response.json()

        if(aux2!=null){

            
            for(let j=0;j < aux2.length;j++)
            {

                console.log('nome do repositório: ' + aux2[j].name)

                console.log('descrição do repositório: ' + aux2[j].description)

                console.log('fork do repositório: ' + aux2[j].fork)

                console.log('stargazers count do repositório: ' + aux2[j].stargazers_count)

            }


        }

    

}

async function getInfoFromUsers(){

    for(let i=0;i<usuarios.length;i++){

        console.log('Usuário ' + i)

        console.log('id do usuário ' + usuarios[i].id )
        console.log('login do usuário ' + usuarios[i].login )
        console.log('nome do usuário ' + usuarios[i].name )
        console.log('bio do usuário ' + usuarios[i].bio )
        console.log('repósitorio público do usuário ' + usuarios[i].public_repos )
        console.log(' url do repósitorio público do usuário ' + usuarios[i].repos_url )

        console.log('\n')
        
    }

}


async function calcRep(){

    let soma:number=0

    for(let i=0;i<usuarios.length;i++){
        soma+=usuarios[i].public_repos
    }

    console.log('A soma de todos os repositórios públicos desse usuário é: ' + soma)

}

async function calcRanking(){

    let pos: GithubUserResponse[] = []

    let maior: number = 0 

    let segundoMaior: number = 0 

    let terceiroMaior: number = 0 

    let quartoMaior: number = 0 

    let quintoMaior: number = 0 


    for(let i=0;i<usuarios.length;i++){
        
        if(usuarios[i].public_repos > maior){

            maior=usuarios[i].public_repos

            if(pos[0]  == null){
                pos[0] = usuarios[i]
            }else{
                pos[1] = pos[0] 
                pos[0] = usuarios[i]
                segundoMaior=pos[1].public_repos
            }

        }else if(usuarios[i].public_repos > segundoMaior){

            segundoMaior=usuarios[i].public_repos

            if(pos[1]  == null){
                pos[1] = usuarios[i]
            }else{
                pos[2] = pos[1] 
                pos[1] = usuarios[i]
                terceiroMaior=pos[2].public_repos
            }

        }else if(usuarios[i].public_repos > terceiroMaior){

            terceiroMaior=usuarios[i].public_repos

            if(pos[2]  == null){
                pos[2] = usuarios[i]
            }else{
                pos[3] = pos[2] 
                pos[2] = usuarios[i]
                quartoMaior=pos[3].public_repos
            }

        }
        else if(usuarios[i].public_repos > quartoMaior){

            quartoMaior=usuarios[i].public_repos

            if(pos[3]  == null){
                pos[3] = usuarios[i]
            }else{
                pos[4] = pos[3] 
                pos[3] = usuarios[i]
                quintoMaior=pos[4].public_repos
            }

        }else if(usuarios[i].public_repos > quintoMaior){

            quintoMaior=usuarios[i].public_repos

            if(pos[4]  == null){
                pos[4] = usuarios[i]
            }else{
                pos[5] = pos[4] 
                pos[4] = usuarios[i]
                
            }

        }else if(usuarios[i].public_repos <= quintoMaior){

            console.log("Esse usuário não está entre os 5 maiores")

            if(pos[5]  == null){
                pos[5] = usuarios[i]
            }else{
                pos.push(usuarios[i])
            }

        }

    }

    console.table(pos)

    return pos

}


async function main(user:string) {

    let aux:GithubUserResponse = await getFromApi(user)

    await getInfoFromUser(aux.login)

    getInfoFromUsers()

    calcRep()

    calcRanking()

}

main('will-hayashi-1996')

main('Salies')

main('RogerioDoCarmo')

main('mortzion')

main('PauloVRefatti')

main('jlsjefferson')


