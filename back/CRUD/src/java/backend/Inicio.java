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
        File xmlFile = new File(ruta+"preguntas.xml");
        JSONObject data = new JSONObject();
        try{
            Document document = (Document) builder.build(xmlFile);
            Element rootNode = document.getRootElement();
            List listaP = rootNode.getChildren("pregunta");
            if(listaP.size() == 0){
                data.put("state", 201);
                data.put("message", "Sin ejercicios");
                response.getWriter().print(data);
                response.getWriter().flush();
            }else{
                JSONArray arr = new JSONArray();
                for (int i = 0; i < listaP.size(); i++){
                    JSONObject preguntas = new JSONObject();
                    Element node = (Element) listaP.get(i);
                    String id = node.getAttributeValue("id");
                    String nompreg = node.getAttributeValue("nombre");
                    String m1 = node.getAttributeValue("m1");
                    String m2 = node.getAttributeValue("m2");
                    String b = node.getAttributeValue("b");
                    preguntas.put("id", id);
                    preguntas.put("nombre", nompreg);
                    preguntas.put("m1", m1);
                    preguntas.put("m2", m2);
                    preguntas.put("b", b);
                    arr.put(preguntas);
                }
                data.put("state", 200);
                data.put("preguntas", arr);
                data.put("message", "Ejercicios encontrados");
                response.getWriter().print(data);
                response.getWriter().flush();
            }
        }catch (IOException io){
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