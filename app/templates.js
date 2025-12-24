import { FlatList, StyleSheet, Text, View } from "react-native";
import { gap, layout, ui } from "../src/utils/styles";
import { save } from "../src/utils/storage";
import uuid from 'react-native-uuid';
import NoteItem from "../src/home/note-item";
import { router, Stack } from "expo-router";
import { useContext, useState } from "react";
import HeaderTemplates from "../src/templates/header-templates";
import { LangContext } from "../src/utils/Context";

export default function Templates() {

    const [columnNumber, setColumnNumber] = useState(2);
    const { language } = useContext(LangContext);

    const templates = [
        {
            title: "🎀 Weekly Planner - Organización",
            id: uuid.v4(),
            content: `<div style=text-align:center><font size=6>🎀</font></div><div style=text-align:center><font size=6>Rutina semanal</font></div><pre style=text-align:center><code type=""style=text-align:left><br></code><code type=""style=text-align:left><font size=6>Lunes</font></code><code type=""><span style=letter-spacing:0><br></span></code><code type=""><ol><li>Escribe tus ideas...<li>Escribe tus ideas...</ol></code></pre><pre style=text-align:center><code type=""style=text-align:left><br></code><code type=""style=text-align:left><font size=6>Martes</font></code><code type=""><span style=letter-spacing:0><br></span></code><code type=""><ol><li>Escribe tus ideas...<li>Escribe tus ideas...</ol></code></pre><pre style=text-align:center><code type=""style=text-align:left><br></code><code type=""style=text-align:left><font size=6>Miercoles</font></code><code type=""><span style=letter-spacing:0><br></span></code><code type=""><ol><li>Escribe tus ideas...<li>Escribe tus ideas...</ol></code></pre><pre style=text-align:center><code type=""style=text-align:left><br></code><code type=""style=text-align:left><font size=6>Jueves</font></code><code type=""><span style=letter-spacing:0><br></span></code><code type=""><ol><li>Escribe tus ideas...<li>Escribe tus ideas...</ol></code></pre><pre style=text-align:center><code type=""style=text-align:left><br></code><code type=""style=text-align:left><font size=6>Viernes</font></code><code type=""><span style=letter-spacing:0><br></span></code><code type=""><ol><li>Escribe tus ideas...<li>Escribe tus ideas...</ol></code></pre><pre style=text-align:center><code type=""style=text-align:left><br></code><code type=""style=text-align:left><font size=6>Sabado</font></code><code type=""><span style=letter-spacing:0><br></span></code><code type=""><ol><li>Escribe tus ideas...<li>Escribe tus ideas...</ol></code></pre><pre style=text-align:center><code type=""style=text-align:left><br></code><code type=""style=text-align:left><font size=6>Domingo</font></code><code type=""><span style=letter-spacing:0><br></span></code><code type=""><ol><li>Escribe tus ideas...<li>Escribe tus ideas...</ol></code></pre>`,
            date: Date.now(),
        },
        {
            title: "🎀 TO DO LIST - Organización",
            id: uuid.v4(),
            content: `<div><span style=background-color:#f49494>  Fecha: 23/12/2025  </span></div><div><span style=background-color:#f49494><br></span></div><div><font size=5><b>TO DO LIST 💝</b></font></div><div><input type=checkbox> ___________</div><div><input type=checkbox> ___________</div><div><input type=checkbox> ___________</div><div><input type=checkbox> ___________</div><div><input type=checkbox> ___________</div><div><br></div><div><font size=5><b>COMIDAS 🍝</b></font></div><pre><code type="">Desayuno</code><code type=""><br></code></pre><pre><code type="">Almuerzo</code><code type=""><br></code></pre><pre><code type="">Cena</code><code type=""><br></code></pre><br><br>`,
            date: Date.now(),
        },
        {
            title: "💗 Wonyoungism - Rutina de disciplina",
            id: uuid.v4(),
            content: `<div style="text-align: center;"><font size="6">🌸</font></div><div style="text-align: center;"><font size="6">Disciplina suave</font></div><div style="text-align: center;"><font size="3">Small habits, consistent energy</font></div><pre style="text-align: center;"><i style="font-size: large; white-space: normal;">Hoy elijo ser constante, no perfecta</i></pre><div><input type="checkbox">&nbsp;Me levanté sin prisas<font size="4"></font></div><div><input type="checkbox">&nbsp;Cuidé mi imagen con cariño</div><div><input type="checkbox">&nbsp;Hice una tarea importante</div><div><input type="checkbox">&nbsp;Moví mi cuerpo</div><div><input type="checkbox">&nbsp;Descansé sin culpa</div><div><input type="checkbox">&nbsp;He bebido suficiente agua</div><div><input type="checkbox">&nbsp;He meditado lo suficiente</div><div><br></div><div style="text-align: center;"><font size="5">¿Qué fue lo más importante hoy? 🥰</font><div 
 style="text-align: center;"><i style="font-size: large; letter-spacing: 0px;"><br></i></div><div style="text-align: center;"><i style="font-size: large; letter-spacing: 0px;">Escribe tus ideas...</i></div><div v=""><div style="text-align: center;"><i style="font-size: large; letter-spacing: 0px;"><br></i></div><div style="text-align: center;"><i style="font-size: large; letter-spacing: 0px;">Escribe tus ideas...</i></div><div style="text-align: center;"><span style="font-size: x-large; letter-spacing: 0px;"><br></span></div><div style="text-align: center;"><span style="font-size: x-large; letter-spacing: 0px;">¿Que hice bien hoy? 🌸</span></div><div style="text-align: center;"><ol><li><i style=""><font size="4">Escribe tus ideas...</font></i></li><li><font size="4"><i>Escribe tus ideas...</i></font></li><li><font size="4"><i>Escribe tus ideas...</i></font></li></ol><div><font size="4"><i><br></i></font></div><div><i style=""><font size="5">Mañana también cuenta...</font></i></div><div><img src="https://mollydigital.manu-scholz.com/wp-content/uploads/2025/07/rose.png"><i style=""><font size="5"></font></i></div></div><div style="text-align: center;"><i style="font-size: large; letter-spacing: 0px;"><br></i></div><div style="text-align: center;"><i style="font-size: large; letter-spacing: 0px;"><br></i></div><div style="text-align: center;"><font size="4"><i><br></i></font></div><div style="text-align: center;"><font size="4"><i><br></i></font></div></div></div>`,
            date: Date.now(),
        },
        {
            title: "🌟 Wonyoungism - Checklist Glow Up",
            id: uuid.v4(),
            content: "<div style=text-align:center><font size=6>💗</font></div><div style=text-align:center><font size=6>Glow Up Checklist</font></div><div style=text-align:center><font size=3>Small steps, radiant energy</font></div><pre style=text-align:center><i style=font-size:large;white-space:normal>Hoy elijo cuidar mi brillo interior</i></pre><div><input type=checkbox> Hice mi skincare</div><div><input type=checkbox> Vestí con estilo y comodidad</div><div><input type=checkbox> Moví mi cuerpo con energía</div><div><input type=checkbox> Tomé agua suficiente</div><div><input type=checkbox> Reflexioné sobre mis logros</div><div><br></div><div style=text-align:center><font size=5>Mi momento favorito del día ✨</font></div><div style=text-align:center><font size=5><br></font></div><div style=text-align:center><i>Escribe tus ideas...</i></div><div style=text-align:center><i><br></i></div><div style=text-align:center><span style=font-size:x-large>¿Qué hice bien hoy? 💗</span></div><div style=text-align:center><ol><li><i>Escribe tus ideas...</i><li><i>Escribe tus ideas...</i><li><i>Escribe tus ideas...</i></ol></div><div style=text-align:center><i><font size=5>Mañana también cuenta...</font></i></div><div style=text-align:center><i><font size=5><br></font></i></div><div style=text-align:center><img src=https://mollydigital.manu-scholz.com/wp-content/uploads/2025/07/scrunchie.png></div>",
            date: Date.now(),
        },
        {
            title: "🧘‍♀️ Self-care - Check semanal",
            id: uuid.v4(),
            content: `<div style=text-align:center><font size=6>🧘‍♀️</font></div><div style=text-align:center><font size=6>Self-care</font></div><div style=text-align:center><font size=3>Recharge, reset, reflect</font></div><pre style=text-align:center><i style=font-size:large;white-space:normal>Hoy priorizo mi bienestar y mi calma</i></pre><div><input type=checkbox> Dormí lo suficiente</div><div><input type=checkbox> Hice algo que disfruto</div><div><input type=checkbox> Moví mi cuerpo suavemente</div><div><input type=checkbox> Me desconecté de pantallas</div><div><input type=checkbox> Reflexioné sobre mis emociones</div><div><br></div><div style=text-align:center><font size=5>Lo que más me cuidó esta semana 🌿</font></div><div style=text-align:center><font size=5><br></font></div><div style=text-align:center><i>Escribe tus ideas...</i></div><div style=text-align:center><i><br></i></div><div style=text-align:center><span style=font-size:x-large>Pequeños logros de autocuidado</span></div><div style=text-align:center><ol><li><i>Escribe tus ideas...</i><li><i>Escribe tus ideas...</i><li><i>Escribe tus ideas...</i></ol></div><div style=text-align:center><i><font size=5>La próxima semana también cuenta...</font></i></div><div style=text-align:center><i><font size=5><br></font></i></div><div style=text-align:center><img src=https://mollydigital.manu-scholz.com/wp-content/uploads/2025/07/flower.png><i><font size=5></font></i></div>`,
            date: Date.now(),
        },
        {
            title: "📚 Estudio y concentración - Notas de estudio",
            id: uuid.v4(),
            content: ` <div style="text-align:center"><font size="6">📖</font></div><div style="text-align:center"><font size="6">Study &amp; Focus</font></div><div style="text-align:center"><font size="3">Organized, aesthetic, productive</font></div><pre style="text-align:center"><i style="font-size:large;white-space:normal">Hoy elijo aprender con claridad y calma</i></pre><div><input type="checkbox">&nbsp;Revisé mis apuntes</div><div><input type="checkbox">&nbsp;Organizé mi espacio de estudio</div><div><input type="checkbox">&nbsp;Hice una pausa activa</div><div><input type="checkbox">&nbsp;Revisé mis objetivos diarios</div><div><input type="checkbox">&nbsp;Tomé notas con estética</div><div><br></div><div style="text-align:center"><font size="5">Lo más importante que aprendí hoy 📚</font></div><div style="text-align:center"><i><br></i></div><div style="text-align:center"><i>Escribe tus ideas...</i></div><div style="text-align:center"><i><br></i></div><div style="text-align:center"><span style="font-size:x-large">Mis logros de estudio</span></div><div style="text-align:center"><ol><li><i>Escribe tus ideas...</i></li><li><i>Escribe tus ideas...</i></li><li><i>Escribe tus ideas...</i></li></ol></div><div style="text-align:center"><i><font size="5">Mañana también cuenta...</font></i></div><div style="text-align: center;"><img src="https://mollydigital.manu-scholz.com/wp-content/uploads/2025/07/rose.png"></div>`,
            date: Date.now(),
        },
        
    ]

    // Al pinchar en una plantilla, debo guardarlo y luego desplazarme a ella.
    async function handleTemplate(template) {
        await save({ ...{ note: template, noteSavedId: template.id, hasDraws: false } });
        router.push({ pathname: "/note", params: { id: template.id, source: "template" } });
    }

    return (
        <>
            <Stack.Screen options={{ header: () => <HeaderTemplates {...{ setColumnNumber, columnNumber }} /> }} />

            <View style={[layout.flex, layout.backgroundLight, layout.paddingHorizontal, gap.big]}>
                <Text style={[ui.h2, ui.black]}>{language.t("_templatesTitle")}</Text>
                <FlatList
                    key={columnNumber}
                    numColumns={columnNumber}
                    data={templates}
                    contentContainerStyle={layout.contentList}
                    columnWrapperStyle={columnNumber > 1 && gap.medium}
                    renderItem={({ item, index }) => <NoteItem {...{ note: item, selected: [], onPress: () => handleTemplate(item), highlight: null, isTemplate: true }} />}
                    keyExtractor={(item) => item.id}
                />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {

    }
})