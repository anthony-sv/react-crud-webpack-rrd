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
        File xmlFile = new File(ruta+"usuarios.xml");
        JSONObject data = new JSONObject();
        String u = request.getParameter("user");
        String p = request.getParameter("pass");
        try{
            Document document = (Document) builder.build(xmlFile);
            Element rootNode = document.getRootElement();
            List listaP = rootNode.getChildren("usuario");
            if(listaP.size() == 0){
                data.put("state", 201);
                data.put("message", "Sin usuarios registrados");
                response.getWriter().print(data);
                response.getWriter().flush();
            }else{
                JSONArray arr = new JSONArray();
                for (int i = 0; i < listaP.size(); i++){
                    JSONObject uss = new JSONObject();
                    Element node = (Element) listaP.get(i);
                    String usuario = node.getAttributeValue("usser");
                    String pass = node.getAttributeValue("password");
                    if(usuario.equals(u) && pass.equals(p)){
                        uss.put("usser", usuario);
                        uss.put("pass", pass);
                        arr.put(uss);
                    }
                }
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
            System.out.println(io.getMessage());
            data.put("state", 404);
            data.put("message", "XML usuarios no encontrado");
            response.getWriter().print(data);
            response.getWriter().flush();
        }catch (JDOMException jdomex){
            System.out.println(jdomex.getMessage());
        }
        
    }
}
