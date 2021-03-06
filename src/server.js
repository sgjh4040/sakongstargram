import "./env";
import {authenticateJwt} from "./passport"
import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import schema from "./schema"
import "./passport";
import cors from "cors";
import {isAuthenticated} from "./middlewares";
import {uploadCOntroller, uploadMiddleWare, uploadsMiddleWare, uploadController} from "./upload"

const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({
  
  context: async({request,connection}) =>{
    return {request,isAuthenticated}
  },
  schema
});

server.express.use(logger("dev"));
server.express.use(authenticateJwt);
server.express.post("/api/upload",cors(),uploadMiddleWare,uploadCOntroller);
server.express.post("/api/uploads",cors(),uploadsMiddleWare,uploadController);

server.start({ port: PORT }, () =>
  console.log(`Server running on  http://localhost:${PORT}`)
);