package backend;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.jdom.Document;
import org.jdom.Element;
import org.jdom.input.SAXBuilder;
import org.jdom.output.Format;
import org.jdom.output.XMLOutputter;

@WebServlet("/upload")
@MultipartConfig
public class NuevaPregunta extends HttpServlet {
    private boolean isMultipart;
    private String filePath;
    private int maxFileSize = 5000 * 1024;
    private int maxMemSize = 4 * 1024;
    private File file ;
    private String[] parametros;
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        filePath = request.getRealPath("/");
        isMultipart = ServletFileUpload.isMultipartContent(request);
        //Variable para guardar los parametros enviados del form
        parametros = new String[19];
        int j = 0;
        if( !isMultipart ) { 
            return;
        }
        DiskFileItemFactory factory = new DiskFileItemFactory();
        factory.setSizeThreshold(maxMemSize);
        factory.setRepository(new File(filePath));
        ServletFileUpload upload = new ServletFileUpload(factory);
        upload.setSizeMax( maxFileSize );
        try { 
            //Se hace un iterador para cada input del form
            List fileItems = upload.parseRequest(request);
            Iterator i = fileItems.iterator();
            while ( i.hasNext () ) {
                FileItem fi = (FileItem)i.next();
                //Se comprueba que el input sea un archivo enviado en mutiparte y lo guarda en servidor
                if ( !fi.isFormField () ) {
                    String fileName = fi.getName();
                    parametros[j] = fileName;
                    if( fileName.lastIndexOf("\\") >= 0 ) {
                        file = new File( filePath + fileName.substring( fileName.lastIndexOf("\\"))) ;
                    } else {
                        file = new File( filePath + fileName.substring(fileName.lastIndexOf("\\")+1)) ;
                    }
                    fi.write( file ) ;
                }else{
                    //Obtiene el valor del input así como el nombre del mismo
                    String fieldName = fi.getFieldName();
                    String fieldValue = fi.getString();
                    parametros[j] = fieldValue;
                }
                j++;
            }
            SAXBuilder builder = new SAXBuilder();
            //Se obtiene el archivo preguntas XML
            File xmlFile = new File(filePath+"preguntas.xml");
            Document doc = (Document) builder.build(xmlFile);
            //Se obtiene el nodo principal y se guarda cada atributo y valor 
            Element rootNode = doc.getRootElement();
            Element pregunta = new Element("pregunta");
            Element ecuaciones = new Element("ecuaciones");
            Element opcion1 = new Element("ecuacion");
            Element opcion2 = new Element("ecuacion");
            Element opcion3 = new Element("ecuacion");
            Element opcion4 = new Element("ecuacion");
            pregunta.setAttribute("id", UUID.randomUUID().toString());
            pregunta.setAttribute("nombre", parametros[0]);
            pregunta.setAttribute("pregunta", parametros[1]);
            //Se comprueba para el apartado de la pista si lo habilitó o no
            if(parametros[6] == null){
                pregunta.setAttribute("pista", "");
            }else{
                pregunta.setAttribute("pista", parametros[7]);
            }
            pregunta.setAttribute("respuestas", parametros[6]);
            opcion1.setText(parametros[2]);
            opcion2.setText(parametros[3]);
            opcion3.setText(parametros[4]);
            opcion4.setText(parametros[5]);
            ecuaciones.addContent(opcion1);
            ecuaciones.addContent(opcion2);
            ecuaciones.addContent(opcion3);
            ecuaciones.addContent(opcion4);
            pregunta.addContent(ecuaciones);
            rootNode.addContent(pregunta);
            //Se crea el archivo XML con los datos
            XMLOutputter xmlOutput = new XMLOutputter();
            xmlOutput.setFormat(Format.getPrettyFormat());
            FileWriter writer = new FileWriter(filePath+"preguntas.xml");                
            xmlOutput.output(doc, writer);
            writer.flush();
            writer.close(); 
            response.sendRedirect("http://localhost:8080/react-crud/"); 
        }catch(Exception ex) {
            System.out.println(ex);
        }
    }
}