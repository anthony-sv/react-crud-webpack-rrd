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
            List fileItems = upload.parseRequest(request);
            Iterator i = fileItems.iterator();
            while ( i.hasNext () ) {
                FileItem fi = (FileItem)i.next();
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
                    String fieldName = fi.getFieldName();
                    String fieldValue = fi.getString();
                    parametros[j] = fieldValue;
                }
                j++;
            }
            SAXBuilder builder = new SAXBuilder();
            File xmlFile = new File(filePath+"preguntas.xml");
            Document doc = (Document) builder.build(xmlFile);
            Element rootNode = doc.getRootElement();
            Element pregunta = new Element("pregunta");
            Element drags = new Element("drags");
            Element opcion1 = new Element("opcion");
            Element opcion2 = new Element("opcion");
            Element opcion3 = new Element("opcion");
            Element opcion4 = new Element("opcion");
            pregunta.setAttribute("id", UUID.randomUUID().toString());
            pregunta.setAttribute("nombre", parametros[0]);
            pregunta.setAttribute("m1", parametros[1]);
            pregunta.setAttribute("m2", parametros[2]);
            pregunta.setAttribute("b", parametros[3]);
            pregunta.setAttribute("respuestas", parametros[4]);
            opcion1.setAttribute("imagen", parametros[5]);
            opcion2.setAttribute("imagen", parametros[6]);
            opcion3.setAttribute("imagen", parametros[7]);
            opcion4.setAttribute("imagen", parametros[8]);
            drags.addContent(opcion1);
            drags.addContent(opcion2);
            drags.addContent(opcion3);
            drags.addContent(opcion4);
            pregunta.addContent(drags);
            rootNode.addContent(pregunta);
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