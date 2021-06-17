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

public class Inicio extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        
        response.setContentType("application/json");
        response.addHeader("Access-Control-Allow-Origin", "*");
        PrintWriter out = response.getWriter();
        String ruta = request.getRealPath("/"); 
        SAXBuilder builder = new SAXBuilder();
        //Se obtiene el archivo de preguntas XML en la path principal del proyecto y se crea un JSON data
        File xmlFile = new File(ruta+"preguntas.xml");
        JSONObject data = new JSONObject();
        try{
            Document document = (Document) builder.build(xmlFile);
            //Se obtiene el nodo principal y una lista de los nodos "pregunta" que es donde se guarda cada ejercicio
            Element rootNode = document.getRootElement();
            List listaP = rootNode.getChildren("pregunta");
            //Se comprueba que haya ejercicios creados, sino se envía un mensaje al front
            if(listaP.size() == 0){
                data.put("state", 201);
                data.put("message", "Sin ejercicios");
                response.getWriter().print(data);
                response.getWriter().flush();
            }else{
                JSONArray arr = new JSONArray();
                //Como si hay ejercicios creados, se envían los datos necesarios para mostrar el nombre del ejercicio en la tabla
                for (int i = 0; i < listaP.size(); i++){
                    JSONObject preguntas = new JSONObject();
                    Element node = (Element) listaP.get(i);
                    String id = node.getAttributeValue("id");
                    String nompreg = node.getAttributeValue("nombre");
                    preguntas.put("id", id);
                    preguntas.put("nombre", nompreg);
                    arr.put(preguntas);
                }
                data.put("state", 200);
                data.put("preguntas", arr);
                data.put("message", "Ejercicios encontrados");
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
                Element raiz = new Element("preguntas");
                Document newdoc = new Document(raiz);
                XMLOutputter fmt = new XMLOutputter();
                FileWriter writer = new FileWriter(ruta+"preguntas.xml");
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