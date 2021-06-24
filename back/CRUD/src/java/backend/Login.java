package backend;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.jdom.Document;
import org.jdom.Element;
import org.jdom.JDOMException;
import org.jdom.input.SAXBuilder;
import org.jdom.output.XMLOutputter;
import org.json.JSONArray;
import org.json.JSONObject;


public class Login extends HttpServlet {
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        
        response.setContentType("application/json");
        response.addHeader("Access-Control-Allow-Origin", "*");
        PrintWriter out = response.getWriter();
        String ruta = request.getRealPath("/"); 
        SAXBuilder builder = new SAXBuilder();
        //Se recupera el archivo usuarios XML donde están almacenados los usuarios validados para el proyecto
        File xmlFile = new File(ruta+"usuarios.xml");
        JSONObject data = new JSONObject();
        //Se obtienen los parametros enviados por el form
        String u = request.getParameter("user");
        String p = request.getParameter("pass");
        try{
            Document document = (Document) builder.build(xmlFile);
            //Se recupera el nodo principal del XML y se hace una lista de los usuarios
            Element rootNode = document.getRootElement();
            List listaP = rootNode.getChildren("usuario");
            //Si no hay usuarios se manda un mensaje de error
            if(listaP.size() == 0){
                data.put("state", 201);
                data.put("message", "Sin usuarios registrados");
                response.getWriter().print(data);
                response.getWriter().flush();
            }else{
                JSONArray arr = new JSONArray();
                //Se crea un ciclo for para comprobar los datos ingresados
                for (int i = 0; i < listaP.size(); i++){
                    JSONObject uss = new JSONObject();
                    Element node = (Element) listaP.get(i);
                    String usuario = node.getAttributeValue("usser");
                    String pass = node.getAttributeValue("password");
                    //Se comprueba que el ususario de la lista sea al mismo que escribio el cliente
                    if(usuario.equals(u) && pass.equals(p)){
                        uss.put("usser", usuario);
                        uss.put("pass", pass);
                        arr.put(uss);
                    }
                }
                //Se comprueba la longitud del arreglo de json, si es 0 es porque no encontró ningún usuario con los valores ingresados por el cliente
                if(arr.length() <= 0){
                    data.put("state", 404);
                    data.put("message", "Usuario no encontrado");
                }else{
                    data.put("state", 200);
                    data.put("usuario", arr);
                    data.put("message", "Usuario encontrado");
                }
                response.getWriter().print(data);
                response.getWriter().flush();
            }
        }catch (IOException io){
            //Si da excepcion por no encontrar el XML se crea uno nuevo vacio
            System.out.println(io.getMessage());
            data.put("state", 404);
            data.put("message", "No existe el archivo xml");
            response.getWriter().print(data);
            response.getWriter().flush();
            try{
                Element raiz = new Element("usuarios");
                Element us = new Element("usuario");
                us.setAttribute("id", "1");
                us.setAttribute("tipo", "1");
                us.setAttribute("usser", "admin");
                us.setAttribute("password", "admin");
                Element us2 = new Element("usuario");
                us2.setAttribute("id", "2");
                us2.setAttribute("tipo", "1");
                us2.setAttribute("usser", "peredo");
                us2.setAttribute("password", "rpv");
                raiz.addContent(us);
                raiz.addContent(us2);
                Document newdoc = new Document(raiz);
                XMLOutputter fmt = new XMLOutputter();
                FileWriter writer = new FileWriter(ruta+"usuarios.xml");
                fmt.output(newdoc, writer);
                writer.flush();
                writer.close();
            }catch(Exception e){
                e.printStackTrace();
            }
        }catch (JDOMException jdomex){
            System.out.println(jdomex.getMessage());
        }
        
    }
}
