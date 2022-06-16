const Mutation = ` 
  type Mutation {
   login(email:String!, password:String!):AuthPayLoad
   register(email:String, password:String, name:String, firstName:String, lastName:String, age:Int):AuthPayLoad
  }
`

export default Mutation;