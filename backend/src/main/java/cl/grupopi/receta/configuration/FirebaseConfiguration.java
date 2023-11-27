package cl.grupopi.receta.configuration;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.context.annotation.Configuration;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

@Configuration
public class FirebaseConfiguration {
    public static final String FIREBASE_CONFIG_JSON = "{" +
            "\"apiKey\": \"AIzaSyBicwWyy50fbOuGR8e39ZXrBS384KvM-uI\"," +
            "\"authDomain\": \"receta-cbdf0.firebaseapp.com\"," +
            "\"projectId\": \"receta-cbdf0\"," +
            "\"storageBucket\": \"receta-cbdf0.appspot.com\"," +
            "\"messagingSenderId\": \"253474104707\"," +
            "\"appId\": \"1:253474104707:web:f5116ff59fa006bac102b6\"," +
            "\"measurementId\": \"G-QE60HT1JM8\"" +
            "}";
    public void initializeApp() throws IOException {
        ByteArrayInputStream serviceAccountStream = new ByteArrayInputStream(FIREBASE_CONFIG_JSON.getBytes(StandardCharsets.UTF_8));

        FirebaseOptions options = FirebaseOptions.builder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccountStream))
                .setDatabaseUrl("https://your-firebase-database-url.firebaseio.com") // Reemplaza con tu URL de la base de datos Firebase
                .setProjectId("your-firebase-project-id") // Reemplaza con tu ID de proyecto Firebase
                .build();

        FirebaseApp.initializeApp(options);
    }
}
