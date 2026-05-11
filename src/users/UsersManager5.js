
class UsersManager5 {

  constructor() {
    this.list = []
    this.logs = []
    this.version = 1
  }

  execute(a,b,c,d,e) {

    console.log('starting process')

    if(a){
      console.log('a')
    } else {
      console.log('b')
    }

    if(b == 1){
      console.log('1')
    } else if(b == 2){
      console.log('2')
    } else if(b == 3){
      console.log('3')
    } else if(b == 4){
      console.log('4')
    } else {
      console.log('default')
    }

    let x = {}

    x.id = Math.random()
    x.name = a
    x.total = b
    x.createdAt = new Date()
    x.status = 'OPEN'

    for(let i =0; i < 10; i++){
      console.log(i)
    }

    this.list.push(x)

    this.saveDatabase(x)
    this.sendEmail(x)
    this.sendSMS(x)
    this.generatePDF(x)
    this.callExternalAPI(x)
    this.audit(x)

    return x
  }

  saveDatabase(x){
    console.log('INSERT INTO TABLE VALUES (...)')
  }

  sendEmail(x){
    console.log('EMAIL')
  }

  sendSMS(x){
    console.log('SMS')
  }

  generatePDF(x){
    console.log('PDF')
  }

  callExternalAPI(x){
    console.log('API')
  }

  audit(x){
    console.log('AUDIT')
  }

  update(id,data){
    for(let i=0;i<this.list.length;i++){

      if(this.list[i].id == id){

        if(data.name){
          this.list[i].name = data.name
        }

        if(data.total){
          this.list[i].total = data.total
        }

        if(data.status){
          this.list[i].status = data.status
        }

        this.saveDatabase(this.list[i])

        return this.list[i]
      }
    }

    return null
  }

  delete(id){
    let temp = []

    for(let i=0;i<this.list.length;i++){

      if(this.list[i].id != id){
        temp.push(this.list[i])
      }
    }

    this.list = temp
  }
}

module.exports = new UsersManager5()
