import './App.css';
import { useState, useRef } from "react";

const MODULES = [
  {
    id: 1,
    phase: "FASE 1",
    title: "El Editor de Unity",
    subtitle: "Conocer el terreno antes de construir",
    color: "#00D4FF",
    glow: "rgba(0,212,255,0.3)",
    icon: "⬡",
    duration: "~45 min",
    lessons: [
      {
        id: "1-1",
        title: "Unity Hub y el primer proyecto",
        theory: `Unity Hub es el gestor de versiones e instalaciones. Antes de abrir Unity necesitas entender su jerarquía: Hub → Editor Version → Project.

**¿Por qué 2022 LTS?** LTS = Long Term Support. Es la versión más estable para proyectos serios. Evita las versiones "tech preview" (inestables).

**Plantilla 2D (URP):** URP = Universal Render Pipeline. Para el HUD del Cyber-Arena usarás principalmente UI 2D, así que esta plantilla es perfecta.`,
        steps: [
          "Descarga Unity Hub desde unity.com/download",
          "Inicia sesión con cuenta gratuita (Personal license)",
          "Hub → Installs → Install Editor → selecciona 2022.3.x LTS",
          "Marca el módulo: Visual Studio Community (editor de C#)",
          "Espera la descarga (~4 GB) y luego: Hub → New Project → 2D (URP)",
          "Nombre: CyberArena_HUD · Elige una carpeta sin espacios ni tildes",
          "Create Project → Unity abre el editor por primera vez"
        ],
        exercise: {
          title: "✅ Checkpoint 1-1",
          desc: "Crea el proyecto y confirma que ves el editor con fondo gris y sin errores en la consola.",
          verify: "La ventana de Unity está abierta, la pestaña Console no muestra texto rojo."
        },
        tip: {
          label: "Java Dev Tip",
          text: "En Java lanzas main() y el programa corre. En Unity el motor ES el programa. Tú solo escribes callbacks que el motor invoca. Piénsalo como un framework, no como un programa lineal."
        }
      },
      {
        id: "1-2",
        title: "Los 5 paneles del editor",
        theory: `El editor de Unity es un IDE visual con 5 ventanas fundamentales. Aprender qué hace cada una te ahorra horas de frustración.

**Flujo de trabajo típico:** creas objetos en Hierarchy → los configuras en Inspector → los ves en Scene → ejecutas con Play y observas en Game → gestionas archivos en Project.`,
        steps: [
          "**Scene:** Vista 3D/2D de tu mundo. Aquí arrastras y posicionas objetos. Usa el scroll para hacer zoom.",
          "**Game:** Lo que verá el jugador final. Solo se activa en Play Mode (botón ▶).",
          "**Hierarchy:** Árbol de todos los GameObjects de la escena actual. Todo objeto del juego vive aquí.",
          "**Inspector:** Propiedades del objeto seleccionado. Aquí conectarás scripts a objetos y ajustarás variables.",
          "**Project:** Tu sistema de archivos del proyecto. Scripts, imágenes, prefabs, todo está aquí.",
          "**Bonus — Console:** Tus Debug.Log() aparecen aquí. Es tu System.out.println() en Unity."
        ],
        exercise: {
          title: "✅ Checkpoint 1-2",
          desc: "Crea un GameObject vacío, renómbralo y observa cómo aparece en Hierarchy e Inspector.",
          verify: "Clic derecho en Hierarchy → Create Empty. Doble clic en 'GameObject' para renombrarlo a 'HUDManager'. Observa el Inspector: componente Transform con Position, Rotation, Scale."
        },
        tip: {
          label: "Shortcut vital",
          text: "Ctrl+Z funciona en Unity igual que en cualquier editor. Si rompes algo, desháce. En Play Mode los cambios NO se guardan — todo vuelve al estado anterior al salir de Play."
        }
      },
      {
        id: "1-3",
        title: "GameObjects y Components",
        theory: `Este es el concepto más importante de Unity. Todo en Unity es un **GameObject** — un contenedor vacío al que se le añaden **Components** para darle funcionalidad.

**Analogía Java:** GameObject ≈ clase vacía. Component ≈ interface implementada. Un GameObject puede tener múltiples components, como una clase implementa múltiples interfaces.

El Transform es el único component que **siempre** está presente — define posición, rotación y escala en el espacio.`,
        steps: [
          "En Hierarchy: clic derecho → 3D Object → Cube. Se crea un cubo con 3 components automáticos.",
          "Selecciona el Cube. En Inspector verás: Transform, Mesh Filter, Mesh Renderer.",
          "Clic en 'Add Component' en el Inspector. Escribe 'Rigidbody' y selecciónalo.",
          "Presiona ▶ Play. El cubo cae por gravedad — el Rigidbody añadió física.",
          "Detén Play (▶ de nuevo). Elimina el Cubo (Delete en Hierarchy).",
          "Crea otro objeto: Hierarchy → UI → Canvas. Observa que también crea un EventSystem automáticamente."
        ],
        exercise: {
          title: "✅ Checkpoint 1-3",
          desc: "Identifica los components de un Canvas recién creado.",
          verify: "Selecciona el Canvas en Hierarchy → Inspector muestra: Canvas, Canvas Scaler, Graphic Raycaster. Son los 3 components básicos de cualquier UI en Unity."
        },
        tip: {
          label: "El patrón mental clave",
          text: "Nunca pienses 'voy a crear una clase Enemigo con método atacar()'. Piensa: 'voy a crear un GameObject con un Component script llamado EnemyController que tiene el método Attack()'. Es un cambio de mentalidad fundamental."
        }
      }
    ]
  },
  {
    id: 2,
    phase: "FASE 2",
    title: "C# para Java/Python Devs",
    subtitle: "El 90% ya lo sabes — solo cambia la sintaxis",
    color: "#00FF9F",
    glow: "rgba(0,255,159,0.3)",
    icon: "◈",
    duration: "~60 min",
    lessons: [
      {
        id: "2-1",
        title: "Tu primer MonoBehaviour",
        theory: `MonoBehaviour es la clase base de casi todos los scripts en Unity. Es el equivalente a extender una clase base en Java.

**Diferencia fundamental con Java:** No hay main(). En cambio hay métodos que Unity llama automáticamente:
- \`Awake()\` → Se llama 1 vez al crear el objeto (antes de Start). Úsalo para inicializar variables.
- \`Start()\` → Se llama 1 vez antes del primer frame. Úsalo para conectar referencias.
- \`Update()\` → Se llama cada frame (~60 veces/segundo). Lógica continua va aquí.`,
        code: `using UnityEngine;

// En Java: public class MiClase extends MonoBehaviour
// En C#:
public class HolaCyberArena : MonoBehaviour
{
    // En Java: private int contador = 0;
    // En C#: igual, pero con tipos minúsculos
    private int contador = 0;
    private float timer = 0f;  // f = float literal (igual que Java)

    // Equivale al constructor, pero en Unity
    void Awake()
    {
        Debug.Log("Awake! — como System.out.println()");
    }

    // Se ejecuta 1 sola vez antes del primer frame
    void Start()
    {
        Debug.Log("Start! objeto: " + gameObject.name);
    }

    // Se ejecuta ~60 veces por segundo
    void Update()
    {
        // Time.deltaTime = segundos desde el último frame (~0.016s)
        timer += Time.deltaTime;
        contador++;

        if (contador % 60 == 0)  // cada ~1 segundo
            Debug.Log("Han pasado: " + timer.ToString("F1") + " s");
    }
}`,
        steps: [
          "Project panel → clic derecho → Create → Folder → llámala 'Scripts'",
          "Dentro de Scripts: clic derecho → Create → C# Script → nombre: HolaCyberArena",
          "Doble clic en el script → se abre Visual Studio con el código base",
          "Reemplaza el contenido con el código de arriba",
          "Ctrl+S para guardar → regresa a Unity",
          "Arrastra el script desde Project hasta el GameObject 'HUDManager' en Hierarchy",
          "Presiona ▶ Play y observa la Console"
        ],
        exercise: {
          title: "✅ Checkpoint 2-1",
          desc: "El script debe imprimir en Console el tiempo transcurrido cada segundo.",
          verify: "En Console verás: 'Awake!' → 'Start!' → 'Han pasado: 1.0 s' → 'Han pasado: 2.0 s'..."
        },
        tip: {
          label: "Python Dev Tip",
          text: "En Python no declaras tipos. En C# sí: int, float, string, bool. Pero funciona igual que Java. Un truco: usa 'var' cuando el tipo es obvio por el contexto: var lista = new List<string>();"
        }
      },
      {
        id: "2-2",
        title: "Variables públicas e Inspector",
        theory: `Una de las características más poderosas de Unity es que las variables **public** de un MonoBehaviour aparecen automáticamente en el Inspector y se pueden editar sin tocar el código.

Esto sirve para dos cosas críticas en el proyecto:
1. **Ajustar valores** en tiempo real (velocidad, sensibilidad del control)
2. **Conectar referencias** a otros GameObjects (la barra de batería, el texto del cronómetro)

También existe **[SerializeField]** para exponer variables privadas al Inspector sin hacerlas públicas — es la práctica más limpia.`,
        code: `using UnityEngine;
using UnityEngine.UI;  // Necesario para Slider, Text, Image

public class RobotHUD : MonoBehaviour
{
    // PUBLIC → visible y editable en el Inspector
    public float velocidadSensibilidad = 1.0f;

    // [SerializeField] → privada en código, visible en Inspector
    // Aquí conectarás los objetos UI arrastrándolos desde Hierarchy
    [SerializeField] private Slider    batteryBar;
    [SerializeField] private Text      timerText;
    [SerializeField] private Image     alertIcon;

    private float timer = 0f;
    private bool  alertaActiva = false;

    void Start()
    {
        batteryBar.value = 1f;          // 100% de batería al inicio
        alertIcon.gameObject.SetActive(false);  // Ocultar alerta
    }

    void Update()
    {
        timer += Time.deltaTime;
        // ToString("F1") = 1 decimal, como Python's f"{timer:.1f}"
        timerText.text = timer.ToString("F1") + " s";
    }

    // Método público que llamarás desde el socket UDP
    public void ActualizarBateria(float porcentaje)
    {
        batteryBar.value = porcentaje / 100f;

        // Color.Lerp: interpola entre rojo (0%) y verde (100%)
        Color color = Color.Lerp(Color.red, Color.green, batteryBar.value);
        // Acceder al Fill del Slider para cambiar su color
        batteryBar.fillRect.GetComponent<Image>().color = color;
    }

    public void MostrarAlerta(bool mostrar)
    {
        alertIcon.gameObject.SetActive(mostrar);
    }
}`,
        steps: [
          "Reemplaza HolaCyberArena con este nuevo script RobotHUD.cs",
          "Guarda y vuelve a Unity. Selecciona HUDManager en Hierarchy.",
          "Ahora ve al Inspector — debes ver los campos: Velocity Sensibilidad, Battery Bar, Timer Text, Alert Icon",
          "Primero crea la UI: Hierarchy → clic derecho → UI → Canvas",
          "Clic derecho en Canvas → UI → Slider → renombra a 'BatteryBar'",
          "Clic derecho en Canvas → UI → Text - TextMeshPro → renombra a 'TimerText'",
          "Arrastra 'BatteryBar' desde Hierarchy al campo 'Battery Bar' del Inspector de HUDManager",
          "Arrastra 'TimerText' al campo 'Timer Text'",
          "▶ Play → el cronómetro corre y la barra está al 100%"
        ],
        exercise: {
          title: "✅ Checkpoint 2-2",
          desc: "En Play Mode, cambia el valor de batteryBar.value manualmente en el Inspector y observa la barra moverse.",
          verify: "Con el juego en Play, selecciona HUDManager → Inspector → busca el Slider, cambia Value entre 0 y 1. La barra se mueve en tiempo real."
        },
        tip: {
          label: "NullReferenceException — el error #1",
          text: "Si ves 'NullReferenceException: Object reference not set...' en Console, significa que arrastraste referencias. Ve al Inspector de HUDManager y confirma que los campos Battery Bar y Timer Text NO están vacíos (deben mostrar el nombre del objeto, no 'None')."
        }
      },
      {
        id: "2-3",
        title: "Leer el Control de Mando (Xbox/PS)",
        theory: `Unity tiene un sistema de Input integrado llamado **Input System** (el nuevo) o **Input Manager** (el clásico). Para el proyecto usaremos el Input Manager clásico por simplicidad.

Los joysticks del control se leen como ejes (Axis) que van de -1.0 a 1.0:
- **Horizontal** → Joystick izquierdo X (izquierda=-1, derecha=1)
- **Vertical** → Joystick izquierdo Y (abajo=-1, arriba=1)

Estos valores son exactamente los que enviarás al robot como \`VEL_LINEAL\` y \`VEL_ANGULAR\` en el protocolo UDP: \`C:0.8:-0.5:0\``,
        code: `using UnityEngine;
using UnityEngine.UI;

public class ControllerInput : MonoBehaviour
{
    [SerializeField] private Text debugText;  // Para ver los valores

    // Estos valores se enviarán por UDP al robot
    [HideInInspector] public float velLineal  = 0f;
    [HideInInspector] public float velAngular = 0f;
    [HideInInspector] public bool  accionBtn  = false;

    void Update()
    {
        // Leer joystick izquierdo (movimiento del robot)
        velLineal  = Input.GetAxis("Vertical");    // W/S o joystick↑↓
        velAngular = Input.GetAxis("Horizontal");  // A/D o joystick←→

        // Leer botón de acción (X en PlayStation, A en Xbox)
        accionBtn = Input.GetButton("Fire1");

        // Construir el string del protocolo UDP
        string payload = string.Format("C:{0:F2}:{1:F2}:{2}",
            velLineal,
            velAngular,
            accionBtn ? 1 : 0);

        // Mostrar en pantalla para debug
        if (debugText != null)
            debugText.text = payload;

        // Debug en Console solo cuando hay movimiento
        if (Mathf.Abs(velLineal) > 0.1f || Mathf.Abs(velAngular) > 0.1f)
            Debug.Log("Payload → Robot: " + payload);
    }
}`,
        steps: [
          "Crea un nuevo script: ControllerInput.cs en la carpeta Scripts",
          "Copia el código de arriba",
          "Adjunta el script al HUDManager (Add Component o arrastra)",
          "Crea un Text UI adicional: renómbralo 'DebugText' y ponlo en una esquina de la pantalla",
          "Arrastra DebugText al campo Debug Text del Inspector",
          "Conecta un control Xbox o PlayStation por USB (o usa WASD del teclado)",
          "▶ Play → mueve el joystick o presiona WASD → observa el payload en pantalla"
        ],
        exercise: {
          title: "✅ Checkpoint 2-3",
          desc: "El texto en pantalla debe mostrar el payload UDP en tiempo real al mover el control.",
          verify: "Al presionar W debes ver C:1.00:0.00:0. Al presionar A: C:0.00:-1.00:0. Al presionar ambos: valores intermedios."
        },
        tip: {
          label: "Dead Zone tip",
          text: "Input.GetAxis() ya tiene una 'dead zone' por defecto (~0.19). Eso significa que pequeños movimientos involuntarios del joystick no generan ruido. Puedes ajustarlo en Edit → Project Settings → Input Manager."
        }
      }
    ]
  },
  {
    id: 3,
    phase: "FASE 3",
    title: "El HUD / UI del Cyber-Arena",
    subtitle: "La interfaz que verá el público en la feria",
    color: "#FFD166",
    glow: "rgba(255,209,102,0.3)",
    icon: "◉",
    duration: "~75 min",
    lessons: [
      {
        id: "3-1",
        title: "Canvas y el sistema de UI",
        theory: `En Unity toda la UI vive dentro de un **Canvas**. El Canvas es un GameObject especial que actúa como la "hoja" donde se dibujan los elementos visuales 2D.

**Canvas Scaler es crítico:** Define cómo escala la UI en diferentes resoluciones. Para el Cyber-Arena configúralo en "Scale With Screen Size" con resolución de referencia 1920×1080 para que el HUD se vea igual en cualquier monitor de la feria.

**Anchors (anclajes):** Definen cómo se posiciona un elemento UI relativo a su padre. Si anclas el cronómetro al top-center, siempre estará en el centro superior sin importar el tamaño de pantalla.`,
        steps: [
          "Selecciona el Canvas → Inspector → Canvas Scaler → cambiar a 'Scale With Screen Size'",
          "Reference Resolution: 1920 x 1080 | Match: 0.5 (equilibrado)",
          "En Game View: cambia la resolución a 1920x1080 (menú desplegable arriba del panel Game)",
          "Clic derecho en Canvas → UI → Panel → renombra 'HUD_Background'",
          "Color del Panel: negro con transparencia 60% (Alpha ~150)",
          "Ajusta el Panel para cubrir solo la parte superior de la pantalla (altura ~15%)",
          "Dentro del Panel crea: UI → Text (cronómetro), UI → Slider (batería), UI → Image (alerta)"
        ],
        exercise: {
          title: "✅ Checkpoint 3-1",
          desc: "Tienes un Canvas configurado para 1920×1080 con un panel semitransparente en la parte superior.",
          verify: "En Game View (1920×1080) el panel oscuro se ve en la parte superior. Al redimensionar la ventana del editor el panel mantiene su proporción."
        },
        tip: {
          label: "Rect Transform",
          text: "Los objetos UI no tienen Transform normal — tienen Rect Transform. Las coordenadas son relativas al padre y al punto de anclaje, no al mundo 3D. Úsalo desde el Inspector, nunca desde código al principio."
        }
      },
      {
        id: "3-2",
        title: "Barra de Batería con colores dinámicos",
        theory: `El Slider de Unity tiene tres partes: Background (fondo gris), Fill Area (área donde crece la barra) y Handle (el círculo deslizable). Para una barra de batería necesitas:
1. Ocultar el Handle (no queremos que el usuario lo mueva)
2. Cambiar el color del Fill dinámicamente según el nivel (verde → amarillo → rojo)
3. Conectar el valor desde el código cuando lleguen datos UDP del robot`,
        steps: [
          "Selecciona BatteryBar → Inspector → Slider component → desactiva 'Interactable'",
          "Expande BatteryBar en Hierarchy: Background → Fill Area → Fill → Handle Slide Area",
          "Selecciona 'Handle Slide Area' → Inspector → desmarca el checkbox del GameObject (se oculta)",
          "Selecciona 'Fill' → Inspector → Image → Color: verde brillante (#00FF7F)",
          "Ajusta el Slider: Min Value=0, Max Value=1, Value=1, Whole Numbers=OFF",
          "Redimensiona la barra en la pantalla: ancho grande, alto pequeño (como una barra de vida de videojuego)",
          "En RobotHUD.cs ya tienes ActualizarBateria() — este método hará el color dinámico"
        ],
        exercise: {
          title: "✅ Checkpoint 3-2",
          desc: "La barra de batería cambia de verde a rojo fluidamente al modificar su valor.",
          verify: "En Play Mode, selecciona HUDManager → In the Inspector busca el script RobotHUD → llama ActualizarBateria(20) desde la Console de Unity."
        },
        tip: {
          label: "Color.Lerp explicado",
          text: "Color.Lerp(Color.red, Color.green, t) donde t va de 0 a 1. Con t=0 obtienes rojo puro, t=0.5 amarillo/naranja, t=1 verde puro. Es exactamente lo que necesitas para batería: Lerp(red, green, battery/100f)."
        }
      },
      {
        id: "3-3",
        title: "Cronómetro y alerta de colisión",
        theory: `El cronómetro es simple: acumular Time.deltaTime en Update(). Lo importante es el formato visual.

La alerta de colisión usa SetActive() para mostrar/ocultar un ícono rojo intermitente. Para el efecto de parpadeo usaremos una Corrutina — el equivalente a un hilo liviano en Unity, como async/await en Python o un Thread en Java pero mucho más sencillo.`,
        code: `using UnityEngine;
using UnityEngine.UI;
using System.Collections;  // Para IEnumerator (corrutinas)

public class RobotHUD : MonoBehaviour
{
    [SerializeField] private Slider batteryBar;
    [SerializeField] private Text   timerText;
    [SerializeField] private Image  alertIcon;

    private float   timer       = 0f;
    private bool    corriendo   = false;
    private Coroutine parpadeoCoroutine;

    public void IniciarCronometro() => corriendo = true;
    public void DetenerCronometro() => corriendo = false;
    public void ResetCronometro()   { timer = 0f; corriendo = false; }

    void Update()
    {
        if (!corriendo) return;

        timer += Time.deltaTime;
        int mins = (int)(timer / 60);
        int segs = (int)(timer % 60);
        int cent = (int)((timer * 100) % 100);
        timerText.text = string.Format("{0:00}:{1:00}.{2:00}", mins, segs, cent);
    }

    public void ActualizarBateria(float pct)
    {
        batteryBar.value = pct / 100f;
        alertIcon.GetComponent<Image>().color =
            Color.Lerp(Color.red, Color.green, batteryBar.value);
    }

    // Corrutina: como async en Python, ejecuta código en pasos por frames
    public void ActivarAlerta(bool activar)
    {
        if (activar)
        {
            if (parpadeoCoroutine == null)
                parpadeoCoroutine = StartCoroutine(ParpadeArAlerta());
        }
        else
        {
            if (parpadeoCoroutine != null)
            {
                StopCoroutine(parpadeoCoroutine);
                parpadeoCoroutine = null;
            }
            alertIcon.gameObject.SetActive(false);
        }
    }

    // IEnumerator = función que puede pausarse y reanudarse
    IEnumerator ParpadeArAlerta()
    {
        while (true)  // Loop infinito controlado por la corrutina
        {
            alertIcon.gameObject.SetActive(true);
            yield return new WaitForSeconds(0.3f);  // Pausa 0.3s
            alertIcon.gameObject.SetActive(false);
            yield return new WaitForSeconds(0.3f);  // Pausa 0.3s
        }
    }
}`,
        steps: [
          "Reemplaza RobotHUD.cs con este código actualizado",
          "Configura el TimerText: font size 48, bold, color blanco, anclaje top-center",
          "Crea un Image roja como AlertIcon con un texto '⚠ COLISIÓN' encima",
          "Arrastra las referencias en el Inspector (batteryBar, timerText, alertIcon)",
          "▶ Play → en Console ejecuta: FindObjectOfType<RobotHUD>().IniciarCronometro()",
          "El cronómetro debe correr en formato MM:SS.CC (minutos:segundos.centésimas)",
          "Prueba la alerta: FindObjectOfType<RobotHUD>().ActivarAlerta(true)"
        ],
        exercise: {
          title: "✅ Checkpoint 3-3",
          desc: "El HUD completo está funcional: cronómetro en formato carrera, batería con color dinámico y alerta parpadeante.",
          verify: "Ves el cronómetro corriendo. La barra de batería cambia de color. Al activar la alerta, el ícono rojo parpadea cada 0.3 segundos."
        },
        tip: {
          label: "Corrutinas vs Threads",
          text: "Las corrutinas NO son multithreading. Corren en el mismo hilo principal pero se pausan con yield return. Son perfectas para animaciones, esperas y secuencias timed. Para el socket UDP (que sí necesita hilo propio) usarás System.Threading.Thread en la Fase 4."
        }
      }
    ]
  },
  {
    id: 4,
    phase: "FASE 4",
    title: "Comunicación UDP con el Robot",
    subtitle: "Conectar Unity con la Raspberry Pi",
    color: "#FF4D6D",
    glow: "rgba(255,77,109,0.3)",
    icon: "◎",
    duration: "~90 min",
    lessons: [
      {
        id: "4-1",
        title: "UdpClient en C# — Enviar comandos",
        theory: `C# tiene soporte nativo para UDP en el namespace **System.Net.Sockets**. No necesitas instalar nada extra.

El patrón para enviar comandos al robot es simple:
1. Crear un UdpClient
2. Definir el endpoint del robot (IP + Puerto)
3. Convertir el string del payload a bytes (UTF-8)
4. Enviar los bytes

**¡Importante!** El socket UDP debe vivir en un **hilo separado** del Update() porque las operaciones de red pueden bloquearse y congelarían el juego. Usaremos System.Threading.`,
        code: `using UnityEngine;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Threading;

public class UDPSender : MonoBehaviour
{
    [Header("Configuración de Red")]
    public string robotIP   = "192.168.1.100";  // IP del robot en LAN
    public int    robotPort = 9000;              // Puerto del servidor en RPi
    public int    sendRateHz = 20;              // Paquetes por segundo

    private UdpClient   udpClient;
    private IPEndPoint  robotEndPoint;
    private Thread      sendThread;
    private bool        isRunning = false;

    // Payload compartido entre Update() y el hilo de envío
    // volatile garantiza visibilidad entre hilos
    private volatile string currentPayload = "C:0.00:0.00:0";

    // Referencia al lector del control
    [SerializeField] private ControllerInput controlInput;

    void Start()
    {
        udpClient    = new UdpClient();
        robotEndPoint = new IPEndPoint(IPAddress.Parse(robotIP), robotPort);

        isRunning  = true;
        sendThread = new Thread(SendLoop);
        sendThread.IsBackground = true;  // Muere con la app
        sendThread.Start();

        Debug.Log($"UDP Sender iniciado → {robotIP}:{robotPort}");
    }

    void Update()
    {
        // Actualizar el payload desde el hilo principal (lectura del control)
        currentPayload = string.Format("C:{0:F2}:{1:F2}:{2}",
            controlInput.velLineal,
            controlInput.velAngular,
            controlInput.accionBtn ? 1 : 0);
    }

    // Este método corre en el hilo de red, no en el hilo principal
    void SendLoop()
    {
        int sleepMs = 1000 / sendRateHz;  // 20Hz = 50ms entre paquetes

        while (isRunning)
        {
            try
            {
                byte[] data = Encoding.UTF8.GetBytes(currentPayload);
                udpClient.Send(data, data.Length, robotEndPoint);
            }
            catch (System.Exception e)
            {
                Debug.LogWarning("UDP Send error: " + e.Message);
            }

            Thread.Sleep(sleepMs);
        }
    }

    // CRÍTICO: siempre cerrar el socket al salir
    void OnDestroy()
    {
        isRunning = false;
        sendThread?.Join(500);  // Espera max 500ms que termine
        udpClient?.Close();
        Debug.Log("UDP Sender cerrado limpiamente.");
    }
}`,
        steps: [
          "Crea UDPSender.cs en la carpeta Scripts",
          "Adjunta el script al HUDManager",
          "En el Inspector configura: Robot IP = 192.168.1.100, Robot Port = 9000, Send Rate Hz = 20",
          "Arrastra el ControllerInput al campo correspondiente",
          "Para probar SIN robot: abre el Wireshark o usa netcat: nc -ul 9000",
          "▶ Play → mueve el joystick → en la terminal del PC debes ver los paquetes llegando",
          "Alternativa de prueba: en Python ejecuta: import socket; s=socket.socket(socket.AF_INET, socket.SOCK_DGRAM); s.bind(('',9000)); print(s.recvfrom(64))"
        ],
        exercise: {
          title: "✅ Checkpoint 4-1",
          desc: "Unity envía paquetes UDP con el payload del control al presionar WASD o mover el joystick.",
          verify: "Con el receptor Python corriendo, al presionar W en Unity verás en la terminal: (b'C:1.00:0.00:0', ('127.0.0.1', puerto))"
        },
        tip: {
          label: "IP estática en la LAN",
          text: "La Raspberry Pi debe tener IP fija (192.168.1.100) en el router privado. En la RPi edita /etc/dhcpcd.conf y añade: interface wlan0 → static ip_address=192.168.1.100/24. Sin IP fija tendrás que cambiar el script de Unity cada vez que el robot se conecte."
        }
      },
      {
        id: "4-2",
        title: "Recibir Telemetría — Robot → Unity",
        theory: `Recibir es más complejo que enviar porque necesitas escuchar en un puerto de forma continua sin bloquear el juego. El patrón es:

1. Un hilo de red escucha los paquetes entrantes
2. Al recibir un paquete, lo parsea y guarda los datos en variables thread-safe
3. El hilo principal (Update) lee esas variables y actualiza la UI

**Parsear el protocolo:** El robot envía \`T:85:12.5\` donde T=Telemetría, 85=batería%, 12.5=distancia frontal en cm.`,
        code: `using UnityEngine;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Threading;

public class UDPReceiver : MonoBehaviour
{
    public int listenPort = 9001;  // Puerto donde Unity escucha

    // Datos de telemetría (thread-safe con volatile)
    private volatile float bateria        = 100f;
    private volatile float distanciaFront = 999f;
    private volatile bool  hayDatosNuevos = false;

    private UdpClient  listener;
    private Thread     receiveThread;
    private bool       isRunning = false;

    [SerializeField] private RobotHUD hudManager;

    void Start()
    {
        listener = new UdpClient(listenPort);
        isRunning = true;

        receiveThread = new Thread(ReceiveLoop);
        receiveThread.IsBackground = true;
        receiveThread.Start();

        Debug.Log($"UDP Receiver escuchando en puerto {listenPort}");
    }

    void ReceiveLoop()
    {
        IPEndPoint remoteEP = new IPEndPoint(IPAddress.Any, 0);

        while (isRunning)
        {
            try
            {
                // Bloquea el hilo hasta recibir datos (OK porque es hilo separado)
                byte[] data    = listener.Receive(ref remoteEP);
                string mensaje = Encoding.UTF8.GetString(data);

                ProcesarMensaje(mensaje);
            }
            catch (SocketException)
            {
                // Se lanza al cerrar el socket — es normal, ignorar
                break;
            }
        }
    }

    void ProcesarMensaje(string msg)
    {
        // Ejemplo: "T:85:12.5"
        string[] partes = msg.Split(':');

        if (partes.Length < 3 || partes[0] != "T") return;

        // float.Parse con cultura invariante (evita problemas con coma/punto)
        if (float.TryParse(partes[1],
            System.Globalization.NumberStyles.Float,
            System.Globalization.CultureInfo.InvariantCulture,
            out float bat))
        {
            bateria = bat;
        }

        if (float.TryParse(partes[2],
            System.Globalization.NumberStyles.Float,
            System.Globalization.CultureInfo.InvariantCulture,
            out float dist))
        {
            distanciaFront = dist;
        }

        hayDatosNuevos = true;
    }

    // Update() corre en el hilo principal — seguro para tocar la UI
    void Update()
    {
        if (!hayDatosNuevos) return;
        hayDatosNuevos = false;

        hudManager.ActualizarBateria(bateria);
        // Alerta si el robot está a menos de 15cm de un obstáculo
        hudManager.ActivarAlerta(distanciaFront < 15f);
    }

    void OnDestroy()
    {
        isRunning = false;
        listener?.Close();
    }
}`,
        steps: [
          "Crea UDPReceiver.cs y adjúntalo al HUDManager",
          "Arrastra el componente RobotHUD al campo hudManager",
          "Para probar sin robot: desde Python envía telemetría simulada:",
          "  import socket, time",
          "  s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)",
          "  while True: s.sendto(b'T:75:8.5', ('127.0.0.1', 9001)); time.sleep(0.5)",
          "▶ Play → la barra de batería debe mostrar 75% y la alerta de colisión debe parpadear (8.5 < 15)"
        ],
        exercise: {
          title: "✅ Checkpoint 4-2",
          desc: "Unity recibe telemetría simulada desde Python y actualiza el HUD automáticamente.",
          verify: "Al enviar T:20:5.0 desde Python: barra de batería roja al 20% + alerta parpadeando. Al enviar T:100:50.0: barra verde al 100% + sin alerta."
        },
        tip: {
          label: "Watchdog en el robot",
          text: "El robot debe implementar un watchdog: si no recibe paquete UDP en 500ms, detiene los motores. En Python/RPi: if time.time() - last_packet_time > 0.5: stop_motors(). Esto evita que el robot se descontrole si Unity crashea durante la demostración."
        }
      }
    ]
  }
];

/* ─── Helpers ─── */
function parseMarkdown(text) {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong style="color:#fff">$1</strong>')
    .replace(/`(.+?)`/g, '<code style="background:#1E2D3D;color:#00D4FF;padding:2px 6px;border-radius:3px;font-family:monospace;font-size:12px">$1</code>')
    .replace(/\n\n/g, '<br/><br/>')
    .replace(/\n/g, '<br/>');
}

/* ─── Components ─── */
function CodeBlock({ code }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const highlighted = code
    .replace(/\/\/.*/g, m => `<span style="color:#6A9955">${m}</span>`)
    .replace(/\b(void|public|private|class|using|new|return|if|else|while|true|false|null|var|int|float|string|bool|volatile|static)\b/g,
      m => `<span style="color:#569CD6">${m}</span>`)
    .replace(/\b(Debug|Time|Input|Color|Mathf|StartCoroutine|StopCoroutine|GameObject|MonoBehaviour|IEnumerator|UdpClient|IPEndPoint|Thread|Encoding)\b/g,
      m => `<span style="color:#4EC9B0">${m}</span>`)
    .replace(/"([^"]*)"/g, m => `<span style="color:#CE9178">${m}</span>`)
    .replace(/\b(\d+\.?\d*f?)\b/g, m => `<span style="color:#B5CEA8">${m}</span>`);

  return (
    <div style={{
      background: "#0D1117",
      border: "1px solid #30363D",
      borderRadius: "8px",
      margin: "16px 0",
      overflow: "hidden"
    }}>
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "8px 12px", background: "#161B22", borderBottom: "1px solid #30363D"
      }}>
        <span style={{ color: "#8B949E", fontSize: "11px", fontFamily: "monospace" }}>C# · Unity</span>
        <button onClick={handleCopy} style={{
          background: copied ? "#238636" : "#21262D",
          border: "1px solid #30363D", borderRadius: "6px",
          color: "#C9D1D9", padding: "4px 10px", cursor: "pointer",
          fontSize: "11px", transition: "all 0.2s"
        }}>
          {copied ? "✓ Copiado" : "Copiar"}
        </button>
      </div>
      <pre style={{
        margin: 0, padding: "16px",
        fontFamily: "'Fira Code', 'Consolas', monospace",
        fontSize: "12px", lineHeight: "1.7",
        color: "#C9D1D9", overflowX: "auto",
        whiteSpace: "pre",
        WebkitOverflowScrolling: "touch"
      }}
        dangerouslySetInnerHTML={{ __html: highlighted }}
      />
    </div>
  );
}

function TipBox({ tip }) {
  const isJava = tip.label.includes("Java") || tip.label.includes("Python");
  const isWarn = tip.label.includes("error") || tip.label.includes("CRÍTICO") || tip.label.includes("Watchdog");
  const color = isWarn ? "#FF4D6D" : isJava ? "#00FF9F" : "#FFD166";
  const bg = isWarn ? "rgba(255,77,109,0.08)" : isJava ? "rgba(0,255,159,0.08)" : "rgba(255,209,102,0.08)";

  return (
    <div style={{
      background: bg, border: `1px solid ${color}`,
      borderLeft: `4px solid ${color}`, borderRadius: "6px",
      padding: "12px 14px", margin: "16px 0"
    }}>
      <div style={{ color, fontWeight: 700, fontSize: "12px", marginBottom: "4px" }}>💡 {tip.label}</div>
      <span style={{ color: "#C8D8E8", fontSize: "13px", lineHeight: "1.6" }}>{tip.text}</span>
    </div>
  );
}

function StepList({ steps }) {
  return (
    <ol style={{ paddingLeft: "20px", margin: "12px 0" }}>
      {steps.map((step, i) => (
        <li key={i} style={{
          color: "#C8D8E8", fontSize: "13px", lineHeight: "1.8", marginBottom: "4px"
        }}>
          <span dangerouslySetInnerHTML={{
            __html: step.replace(/\*\*(.+?)\*\*/g, '<strong style="color:#fff">$1</strong>')
          }} />
        </li>
      ))}
    </ol>
  );
}

function ExerciseBox({ exercise }) {
  const [done, setDone] = useState(false);
  return (
    <div style={{
      background: done ? "rgba(0,255,159,0.1)" : "rgba(0,212,255,0.08)",
      border: `1px solid ${done ? "#00FF9F" : "#00D4FF"}`,
      borderRadius: "8px", padding: "14px", margin: "16px 0",
      transition: "all 0.3s"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "10px" }}>
        <div style={{ flex: 1 }}>
          <div style={{ color: done ? "#00FF9F" : "#00D4FF", fontWeight: 700, marginBottom: "6px", fontSize: "13px" }}>
            {done ? "✅ " : "🎯 "}{exercise.title}
          </div>
          <div style={{ color: "#C8D8E8", fontSize: "13px", lineHeight: "1.6", marginBottom: "6px" }}>
            {exercise.desc}
          </div>
          <div style={{ color: "#8899AA", fontSize: "11px", fontStyle: "italic" }}>
            Verificación: {exercise.verify}
          </div>
        </div>
        <button onClick={() => setDone(!done)} style={{
          background: done ? "#00FF9F" : "transparent",
          border: `2px solid ${done ? "#00FF9F" : "#00D4FF"}`,
          borderRadius: "50%", width: "32px", height: "32px", minWidth: "32px",
          cursor: "pointer", flexShrink: 0,
          color: done ? "#0A0E1A" : "#00D4FF",
          fontSize: "15px", fontWeight: "bold",
          display: "flex", alignItems: "center", justifyContent: "center"
        }}>
          {done ? "✓" : "○"}
        </button>
      </div>
    </div>
  );
}

function LessonView({ lesson, moduleColor }) {
  return (
    <div>
      <div style={{
        color: moduleColor, fontSize: "10px", fontWeight: 700,
        letterSpacing: "2px", textTransform: "uppercase", marginBottom: "6px"
      }}>
        LECCIÓN
      </div>
      <h2 style={{
        color: "#FFFFFF", fontSize: "20px", fontWeight: 700,
        marginBottom: "16px", lineHeight: "1.3", margin: "0 0 16px 0"
      }}>
        {lesson.title}
      </h2>

      <div style={{
        color: "#C8D8E8", fontSize: "14px", lineHeight: "1.8", marginBottom: "20px"
      }}
        dangerouslySetInnerHTML={{ __html: parseMarkdown(lesson.theory) }}
      />

      {lesson.code && <CodeBlock code={lesson.code} />}

      <div style={{
        color: "#8899AA", fontSize: "11px", fontWeight: 700,
        letterSpacing: "1px", textTransform: "uppercase",
        marginBottom: "8px", marginTop: "20px"
      }}>
        PASOS PRÁCTICOS
      </div>
      <StepList steps={lesson.steps} />

      <TipBox tip={lesson.tip} />
      <ExerciseBox exercise={lesson.exercise} />
    </div>
  );
}

/* ─── Drawer/Bottom Sheet for mobile ─── */
function MobileModuleDrawer({ modules, activeModule, activeLesson, completedLessons, onSelect, onClose }) {
  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)",
          zIndex: 40, backdropFilter: "blur(2px)"
        }}
      />
      {/* Sheet */}
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0,
        background: "#0D1525", borderTop: "1px solid #1E3350",
        borderRadius: "16px 16px 0 0",
        zIndex: 50, maxHeight: "75vh", display: "flex", flexDirection: "column",
        animation: "slideUp 0.25s ease"
      }}>
        <div style={{
          padding: "12px 20px 8px", display: "flex", justifyContent: "space-between",
          alignItems: "center", borderBottom: "1px solid #1E3350", flexShrink: 0
        }}>
          <span style={{ color: "#fff", fontWeight: 700, fontSize: "15px" }}>Lecciones</span>
          <button onClick={onClose} style={{
            background: "#1E3350", border: "none", borderRadius: "50%",
            width: "28px", height: "28px", color: "#8899AA", cursor: "pointer",
            fontSize: "16px", display: "flex", alignItems: "center", justifyContent: "center"
          }}>×</button>
        </div>
        <div style={{ overflowY: "auto", padding: "8px 0 20px", WebkitOverflowScrolling: "touch" }}>
          {modules.map((m, mi) => (
            <div key={mi}>
              <div style={{
                padding: "10px 20px 6px",
                display: "flex", alignItems: "center", gap: "8px"
              }}>
                <span style={{ color: m.color, fontSize: "15px" }}>{m.icon}</span>
                <div>
                  <div style={{ color: m.color, fontSize: "10px", fontWeight: 700, letterSpacing: "1px" }}>
                    {m.phase}
                  </div>
                  <div style={{ color: "#fff", fontSize: "13px", fontWeight: 600 }}>{m.title}</div>
                </div>
              </div>
              {m.lessons.map((l, li) => {
                const key = `${mi}-${li}`;
                const isActive = mi === activeModule && li === activeLesson;
                const isDone = completedLessons.has(key);
                return (
                  <button key={li} onClick={() => { onSelect(mi, li); onClose(); }} style={{
                    width: "100%", textAlign: "left",
                    padding: "10px 20px 10px 44px",
                    background: isActive ? `${m.color}15` : "transparent",
                    border: "none", borderLeft: isActive ? `3px solid ${m.color}` : "3px solid transparent",
                    cursor: "pointer", display: "flex", alignItems: "center", gap: "10px",
                  }}>
                    <span style={{
                      width: "20px", height: "20px", borderRadius: "50%",
                      background: isDone ? m.color : isActive ? `${m.color}30` : "#1E3350",
                      border: `1px solid ${isDone || isActive ? m.color : "#2A4060"}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "10px", color: isDone ? "#0A0E1A" : m.color,
                      flexShrink: 0, fontWeight: 700
                    }}>
                      {isDone ? "✓" : li + 1}
                    </span>
                    <span style={{ color: isActive ? "#fff" : "#8899AA", fontSize: "13px", lineHeight: "1.4" }}>
                      {l.title}
                    </span>
                  </button>
                );
              })}
              {mi < modules.length - 1 && (
                <div style={{ height: "1px", background: "#1E3350", margin: "6px 20px" }} />
              )}
            </div>
          ))}
        </div>
      </div>
      <style>{`@keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }`}</style>
    </>
  );
}

/* ─── Main App ─── */
export default function App() {
  const [activeModule, setActiveModule] = useState(0);
  const [activeLesson, setActiveLesson] = useState(0);
  const [completedLessons, setCompletedLessons] = useState(new Set());
  const [drawerOpen, setDrawerOpen] = useState(false);
  const contentRef = useRef(null);

  const mod = MODULES[activeModule];
  const lesson = mod.lessons[activeLesson];
  const totalLessons = MODULES.reduce((a, m) => a + m.lessons.length, 0);
  const progress = Math.round((completedLessons.size / totalLessons) * 100);

  const goToLesson = (mi, li) => {
    setActiveModule(mi);
    setActiveLesson(li);
    contentRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  const nextLesson = () => {
    const lessonId = `${activeModule}-${activeLesson}`;
    setCompletedLessons(prev => new Set([...prev, lessonId]));
    if (activeLesson < mod.lessons.length - 1) {
      goToLesson(activeModule, activeLesson + 1);
    } else if (activeModule < MODULES.length - 1) {
      goToLesson(activeModule + 1, 0);
    }
  };

  const prevLesson = () => {
    if (activeLesson > 0) goToLesson(activeModule, activeLesson - 1);
    else if (activeModule > 0) goToLesson(activeModule - 1, MODULES[activeModule - 1].lessons.length - 1);
  };

  const isFirst = activeModule === 0 && activeLesson === 0;
  const isLast = activeModule === MODULES.length - 1 && activeLesson === mod.lessons.length - 1;
  const lessonKey = `${activeModule}-${activeLesson}`;

  // Global lesson index for linear numbering
  let globalLessonIdx = 0;
  for (let mi = 0; mi < activeModule; mi++) globalLessonIdx += MODULES[mi].lessons.length;
  globalLessonIdx += activeLesson + 1;

  return (
    <div style={{
      display: "flex", height: "100dvh", background: "#0A0E1A",
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      color: "#C8D8E8", overflow: "hidden", flexDirection: "column"
    }}>

      {/* ── DESKTOP LAYOUT ── */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden", height: "100%" }}>

        {/* ── SIDEBAR (desktop only, hidden on mobile) ── */}
        <div style={{
          width: "268px", flexShrink: 0, background: "#0D1525",
          borderRight: "1px solid #1E3350",
          display: "flex", flexDirection: "column", overflow: "hidden"
        }}
          className="desktop-sidebar"
        >
          {/* Logo */}
          <div style={{ padding: "18px 18px 14px", borderBottom: "1px solid #1E3350" }}>
            <div style={{ fontSize: "10px", color: "#00D4FF", letterSpacing: "3px", fontWeight: 700, marginBottom: "2px" }}>
              CYBER-ARENA
            </div>
            <div style={{ fontSize: "16px", fontWeight: 700, color: "#fff" }}>Ruta Unity</div>
            <div style={{ marginTop: "10px", height: "5px", background: "#1E3350", borderRadius: "3px", overflow: "hidden" }}>
              <div style={{
                height: "100%", width: `${progress}%`,
                background: "linear-gradient(90deg, #00D4FF, #00FF9F)",
                borderRadius: "3px", transition: "width 0.5s ease"
              }} />
            </div>
            <div style={{ fontSize: "11px", color: "#8899AA", marginTop: "4px" }}>
              {progress}% · {completedLessons.size}/{totalLessons} lecciones
            </div>
          </div>

          {/* Module list */}
          <div style={{ flex: 1, overflowY: "auto", padding: "10px 0" }}>
            {MODULES.map((m, mi) => (
              <div key={mi}>
                <div style={{ padding: "8px 18px 6px", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ color: m.color, fontSize: "15px" }}>{m.icon}</span>
                  <div>
                    <div style={{ color: m.color, fontSize: "10px", fontWeight: 700, letterSpacing: "1.5px" }}>{m.phase}</div>
                    <div style={{ color: "#fff", fontSize: "12px", fontWeight: 600, lineHeight: "1.3" }}>{m.title}</div>
                  </div>
                </div>
                {m.lessons.map((l, li) => {
                  const key = `${mi}-${li}`;
                  const isActive = mi === activeModule && li === activeLesson;
                  const isDone = completedLessons.has(key);
                  return (
                    <button key={li} onClick={() => goToLesson(mi, li)} style={{
                      width: "100%", textAlign: "left",
                      padding: "7px 18px 7px 42px",
                      background: isActive ? `${m.color}15` : "transparent",
                      border: "none", borderLeft: isActive ? `3px solid ${m.color}` : "3px solid transparent",
                      cursor: "pointer", display: "flex", alignItems: "center", gap: "8px",
                    }}>
                      <span style={{
                        width: "18px", height: "18px", borderRadius: "50%",
                        background: isDone ? m.color : isActive ? `${m.color}30` : "#1E3350",
                        border: `1px solid ${isDone || isActive ? m.color : "#2A4060"}`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "9px", color: isDone ? "#0A0E1A" : m.color,
                        flexShrink: 0, fontWeight: 700
                      }}>
                        {isDone ? "✓" : li + 1}
                      </span>
                      <span style={{ color: isActive ? "#fff" : "#8899AA", fontSize: "12px", lineHeight: "1.4" }}>
                        {l.title}
                      </span>
                    </button>
                  );
                })}
                {mi < MODULES.length - 1 && <div style={{ height: "1px", background: "#1E3350", margin: "6px 18px" }} />}
              </div>
            ))}
          </div>
        </div>

        {/* ── CONTENT AREA ── */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>

          {/* ── MOBILE TOP BAR ── */}
          <div className="mobile-topbar" style={{
            display: "none",
            padding: "10px 16px",
            background: "#0D1525",
            borderBottom: "1px solid #1E3350",
            alignItems: "center", gap: "10px", flexShrink: 0
          }}>
            <button onClick={() => setDrawerOpen(true)} style={{
              background: "#1E3350", border: "none", borderRadius: "8px",
              color: mod.color, padding: "7px 10px", cursor: "pointer",
              fontSize: "16px", display: "flex", alignItems: "center", gap: "6px",
              flexShrink: 0
            }}>
              <span>☰</span>
            </button>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ color: mod.color, fontSize: "9px", fontWeight: 700, letterSpacing: "1.5px" }}>
                {mod.phase}
              </div>
              <div style={{
                color: "#fff", fontSize: "13px", fontWeight: 600,
                whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"
              }}>
                {lesson.title}
              </div>
            </div>
            {/* Mini progress */}
            <div style={{ display: "flex", alignItems: "center", gap: "6px", flexShrink: 0 }}>
              <div style={{ width: "40px", height: "4px", background: "#1E3350", borderRadius: "2px", overflow: "hidden" }}>
                <div style={{
                  height: "100%", width: `${progress}%`,
                  background: "linear-gradient(90deg, #00D4FF, #00FF9F)", borderRadius: "2px"
                }} />
              </div>
              <span style={{ color: "#8899AA", fontSize: "10px" }}>{progress}%</span>
            </div>
          </div>

          {/* Module banner */}
          <div style={{
            background: `linear-gradient(135deg, ${mod.glow}, transparent 60%)`,
            borderBottom: "1px solid #1E3350",
            padding: "16px 20px 14px",
            flexShrink: 0
          }}
            className="module-banner"
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
              <span style={{ fontSize: "28px" }}>{mod.icon}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ color: mod.color, fontSize: "10px", fontWeight: 700, letterSpacing: "2px" }}>
                  {mod.phase} · {mod.duration}
                </div>
                <div style={{ color: "#fff", fontSize: "17px", fontWeight: 700 }}>{mod.title}</div>
                <div style={{ color: "#8899AA", fontSize: "12px" }}>{mod.subtitle}</div>
              </div>
              <div style={{ display: "flex", gap: "6px", flexShrink: 0 }}>
                {mod.lessons.map((_, li) => (
                  <div key={li} style={{
                    width: "7px", height: "7px", borderRadius: "50%",
                    background: completedLessons.has(`${activeModule}-${li}`)
                      ? mod.color : li === activeLesson ? `${mod.color}60` : "#1E3350"
                  }} />
                ))}
              </div>
            </div>
          </div>

          {/* Scrollable lesson content */}
          <div ref={contentRef} style={{ flex: 1, overflowY: "auto", WebkitOverflowScrolling: "touch" }}>
            <div style={{ padding: "20px 20px 8px", maxWidth: "820px", margin: "0 auto" }}
              className="lesson-padding"
            >
              <LessonView key={lessonKey} lesson={lesson} moduleColor={mod.color} />
            </div>
          </div>

          {/* ── NAVIGATION FOOTER ── */}
          <div style={{
            padding: "12px 16px",
            borderTop: "1px solid #1E3350",
            background: "#0D1525",
            display: "flex", justifyContent: "space-between", alignItems: "center", gap: "8px",
            flexShrink: 0
          }}>
            <button onClick={prevLesson} disabled={isFirst} style={{
              background: "transparent", border: "1px solid #1E3350",
              borderRadius: "8px", color: "#8899AA", padding: "9px 14px",
              cursor: isFirst ? "default" : "pointer", fontSize: "13px",
              opacity: isFirst ? 0.3 : 1, flexShrink: 0
            }}>
              ← Anterior
            </button>

            <div style={{ color: "#8899AA", fontSize: "11px", textAlign: "center", lineHeight: "1.4" }}>
              <div>{mod.phase}</div>
              <div>{activeLesson + 1}/{mod.lessons.length}</div>
            </div>

            <button onClick={nextLesson} disabled={isLast} style={{
              background: mod.color, border: "none",
              borderRadius: "8px", color: "#0A0E1A",
              padding: "9px 16px", cursor: isLast ? "default" : "pointer",
              fontSize: "13px", fontWeight: 700,
              opacity: isLast ? 0.3 : 1, flexShrink: 0
            }}>
              Completar →
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {drawerOpen && (
        <MobileModuleDrawer
          modules={MODULES}
          activeModule={activeModule}
          activeLesson={activeLesson}
          completedLessons={completedLessons}
          onSelect={goToLesson}
          onClose={() => setDrawerOpen(false)}
        />
      )}

      {/* ── Responsive CSS ── */}
      <style>{`
        * { box-sizing: border-box; }

        /* Mobile: hide desktop sidebar, show mobile topbar */
        @media (max-width: 640px) {
          .desktop-sidebar { display: none !important; }
          .mobile-topbar   { display: flex !important; }
          .module-banner   { display: none !important; }
          .lesson-padding  { padding: 16px 16px 8px !important; }
        }

        /* Tablet: narrower sidebar */
        @media (min-width: 641px) and (max-width: 900px) {
          .desktop-sidebar { width: 220px !important; }
        }

        /* Scrollbar styling */
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #1E3350; border-radius: 4px; }
      `}</style>
    </div>
  );
}
