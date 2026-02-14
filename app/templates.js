import { FlatList, StyleSheet, Text, View } from "react-native";
import { gap, layout, ui } from "../src/utils/styles";
import { save } from "../src/utils/storage";
import uuid from 'react-native-uuid';
import NoteItem from "../src/home/note-item";
import { router, Stack } from "expo-router";
import { useContext, useState } from "react";
import HeaderTemplates from "../src/templates/header-templates";
import { LangContext } from "../src/utils/Context";
import PinkPatternBackground from "../src/components/pink-pattern-background";

const TEMPLATES = [
    {
        title: "🎀 Weekly Planner - Organización",
        id: 'tpl-weekly-planner',
        content: `<div style="text-align:center"><font size="6">🎀</font></div><div style="text-align:center"><font size="6">Rutina semanal</font></div><pre style="text-align:center"><code type="" style="text-align:left"><br></code><code type="" style="text-align:left"><font size="6">Lunes</font></code><code type=""><span style="letter-spacing:0"><br></span></code><code type="">&bull; Escribe tus ideas...<br>&bull; Escribe tus ideas...</code></pre><pre style="text-align:center"><code type="" style="text-align:left"><br></code><code type="" style="text-align:left"><font size="6">Martes</font></code><code type=""><span style="letter-spacing:0"><br></span></code><code type="">&bull; Escribe tus ideas...<br>&bull; Escribe tus ideas...</code></pre><pre style="text-align:center"><code type="" style="text-align:left"><br></code><code type="" style="text-align:left"><font size="6">Miercoles</font></code><code type=""><span style="letter-spacing:0"><br></span></code><code type="">&bull; Escribe tus ideas...<br>&bull; Escribe tus ideas...</code></pre><pre style="text-align:center"><code type="" style="text-align:left"><br></code><code type="" style="text-align:left"><font size="6">Jueves</font></code><code type=""><span style="letter-spacing:0"><br></span></code><code type="">&bull; Escribe tus ideas...<br>&bull; Escribe tus ideas...</code></pre><pre style="text-align:center"><code type="" style="text-align:left"><br></code><code type="" style="text-align:left"><font size="6">Viernes</font></code><code type=""><span style="letter-spacing:0"><br></span></code><code type="">&bull; Escribe tus ideas...<br>&bull; Escribe tus ideas...</code></pre><pre style="text-align:center"><code type="" style="text-align:left"><br></code><code type="" style="text-align:left"><font size="6">Sabado</font></code><code type=""><span style="letter-spacing:0"><br></span></code><code type="">&bull; Escribe tus ideas...<br>&bull; Escribe tus ideas...</code></pre><pre style="text-align:center"><code type="" style="text-align:left"><br></code><code type="" style="text-align:left"><font size="6">Domingo</font></code><code type=""><span style="letter-spacing:0"><br></span></code><code type="">&bull; Escribe tus ideas...<br>&bull; Escribe tus ideas...</code></pre>`,
        date: Date.now(),
    },
    {
        title: "🎀 TO DO LIST - Organización",
        id: 'tpl-todo-list',
        content: `<div><font size="5"><b>TO DO LIST 💝</b></font></div><div><input type="checkbox">&nbsp;___________</div><div><input type="checkbox">&nbsp;___________</div><div><input type="checkbox">&nbsp;___________</div><div><input type="checkbox">&nbsp;___________</div><div><input type="checkbox">&nbsp;___________</div><div><br></div><div><font size="5"><b>COMIDAS 🍝</b></font></div><pre><code type="">Desayuno</code><code type=""><br></code></pre><pre><code type="">Almuerzo</code><code type=""><br></code></pre><pre><code type="">Cena</code><code type=""><br></code></pre><br><br>`,
        date: Date.now(),
    },
    {
        title: "💗 Wonyoungism - Rutina de disciplina",
        id: 'tpl-discipline-routine',
        content: `<div style="text-align: center;"><font size="6">🌸</font></div><div style="text-align: center;"><font size="6">Disciplina suave</font></div><div style="text-align: center;"><font size="3">Small habits, consistent energy</font></div><pre style="text-align: center;"><i style="font-size: large; white-space: normal;">Hoy elijo ser constante, no perfecta</i></pre><div><input type="checkbox">&nbsp;Me levanté sin prisas</div><div><input type="checkbox">&nbsp;Cuidé mi imagen con cariño</div><div><input type="checkbox">&nbsp;Hice una tarea importante</div><div><input type="checkbox">&nbsp;Moví mi cuerpo</div><div><input type="checkbox">&nbsp;Descansé sin culpa</div><div><input type="checkbox">&nbsp;He bebido suficiente agua</div><div><input type="checkbox">&nbsp;He meditado lo suficiente</div><div><br></div><div style="text-align: center;"><font size="5">¿Qué fue lo más importante hoy? 🥰</font></div><div style="text-align: center;"><i style="font-size: large; letter-spacing: 0px;"><br></i></div><div style="text-align: center;"><i style="font-size: large; letter-spacing: 0px;">Escribe tus ideas...</i></div><div style="text-align: center;"><i style="font-size: large; letter-spacing: 0px;"><br></i></div><div style="text-align: center;"><i style="font-size: large; letter-spacing: 0px;">Escribe tus ideas...</i></div><div style="text-align: center;"><span style="font-size: x-large; letter-spacing: 0px;"><br></span></div><div style="text-align: center;"><span style="font-size: x-large; letter-spacing: 0px;">¿Que hice bien hoy? 🌸</span></div><div style="text-align: center;"><ol><li><i style=""><font size="4">Escribe tus ideas...</font></i></li><li><font size="4"><i>Escribe tus ideas...</i></font></li><li><font size="4"><i>Escribe tus ideas...</i></font></li></ol><div><font size="4"><i><br></i></font></div><div><i style=""><font size="5">Mañana también cuenta...</font></i></div><div><img src="https://mollydigital.manu-scholz.com/wp-content/uploads/2025/07/rose.png"><i style=""><font size="5"></font></i></div></div><div style="text-align: center;"><i style="font-size: large; letter-spacing: 0px;"><br></i></div><div style="text-align: center;"><i style="font-size: large; letter-spacing: 0px;"><br></i></div><div style="text-align: center;"><font size="4"><i><br></i></font></div><div style="text-align: center;"><font size="4"><i><br></i></font></div>`,
        date: Date.now(),
    },
    {
        title: "🌟 Wonyoungism - Checklist Glow Up",
        id: 'tpl-glow-up',
        content: "<div style=\"text-align:center\"><font size=\"6\">💗</font></div><div style=\"text-align:center\"><font size=\"6\">Glow Up Checklist</font></div><div style=\"text-align:center\"><font size=\"3\">Small steps, radiant energy</font></div><pre style=\"text-align:center\"><i style=\"font-size:large;white-space:normal\">Hoy elijo cuidar mi brillo interior</i></pre><div><input type=\"checkbox\">&nbsp;Hice mi skincare</div><div><input type=\"checkbox\">&nbsp;Vestí con estilo y comodidad</div><div><input type=\"checkbox\">&nbsp;Moví mi cuerpo con energía</div><div><input type=\"checkbox\">&nbsp;Tomé agua suficiente</div><div><input type=\"checkbox\">&nbsp;Reflexioné sobre mis logros</div><div><br></div><div style=\"text-align:center\"><font size=\"5\">Mi momento favorito del día ✨</font></div><div style=\"text-align:center\"><font size=\"5\"><br></font></div><div style=\"text-align:center\"><i>Escribe tus ideas...</i></div><div style=\"text-align:center\"><i><br></i></div><div style=\"text-align:center\"><span style=\"font-size:x-large\">¿Qué hice bien hoy? 💗</span></div><div style=\"text-align:center\"><ol><li><i>Escribe tus ideas...</i></li><li><i>Escribe tus ideas...</i></li><li><i>Escribe tus ideas...</i></li></ol></div><div style=\"text-align:center\"><i><font size=\"5\">Mañana también cuenta...</font></i></div><div style=\"text-align:center\"><i><font size=\"5\"><br></font></i></div><div style=\"text-align:center\"><img src=\"https://mollydigital.manu-scholz.com/wp-content/uploads/2025/07/scrunchie.png\"></div>",
        date: Date.now(),
    },
    {
        title: "🧘‍♀️ Self-care - Check semanal",
        id: 'tpl-self-care',
        content: `<div style="text-align:center"><font size="6">🧘‍♀️</font></div><div style="text-align:center"><font size="6">Self-care</font></div><div style="text-align:center"><font size="3">Recharge, reset, reflect</font></div><pre style="text-align:center"><i style="font-size:large;white-space:normal">Hoy priorizo mi bienestar y mi calma</i></pre><div><input type="checkbox">&nbsp;Dormí lo suficiente</div><div><input type="checkbox">&nbsp;Hice algo que disfruto</div><div><input type="checkbox">&nbsp;Moví mi cuerpo suavemente</div><div><input type="checkbox">&nbsp;Me desconecté de pantallas</div><div><input type="checkbox">&nbsp;Reflexioné sobre mis emociones</div><div><br></div><div style="text-align:center"><font size="5">Lo que más me cuidó esta semana 🌿</font></div><div style="text-align:center"><font size="5"><br></font></div><div style="text-align:center"><i>Escribe tus ideas...</i></div><div style="text-align:center"><i><br></i></div><div style="text-align:center"><span style="font-size:x-large">Pequeños logros de autocuidado</span></div><div style="text-align:center"><ol><li><i>Escribe tus ideas...</i></li><li><i>Escribe tus ideas...</i></li><li><i>Escribe tus ideas...</i></li></ol></div><div style="text-align:center"><i><font size="5">La próxima semana también cuenta...</font></i></div><div style="text-align:center"><i><font size="5"><br></font></i></div><div style="text-align:center"><img src="https://mollydigital.manu-scholz.com/wp-content/uploads/2025/07/flower.png"><i><font size="5"></font></i></div>`,
        date: Date.now(),
    },
    {
        title: "📚 Estudio y concentración - Notas de estudio",
        id: 'tpl-study-notes',
        content: ` <div style="text-align:center"><font size="6">📖</font></div><div style="text-align:center"><font size="6">Study &amp; Focus</font></div><div style="text-align:center"><font size="3">Organized, aesthetic, productive</font></div><pre style="text-align:center"><i style="font-size:large;white-space:normal">Hoy elijo aprender con claridad y calma</i></pre><div><input type="checkbox">&nbsp;Revisé mi espacio de estudio</div><div><input type="checkbox">&nbsp;Hice una pausa activa</div><div><input type="checkbox">&nbsp;Revisé mis objetivos diarios</div><div><input type="checkbox">&nbsp;Tomé notas con estética</div><div><br></div><div style="text-align:center"><font size="5">Lo más importante que aprendí hoy 📚</font></div><div style="text-align:center"><i><br></i></div><div style="text-align:center"><i>Escribe tus ideas...</i></div><div style="text-align:center"><i><br></i></div><div style="text-align:center"><span style="font-size:x-large">Mis logros de estudio</span></div><div style="text-align:center"><ol><li><i>Escribe tus ideas...</i></li><li><i>Escribe tus ideas...</i></li><li><i>Escribe tus ideas...</i></li></ol></div><div style="text-align:center"><i><font size="5">Mañana también cuenta...</font></i></div><div style="text-align: center;"><img src="https://mollydigital.manu-scholz.com/wp-content/uploads/2025/07/rose.png"></div>`,
        date: Date.now(),
    },
];

export default function Templates() {

    const [columnNumber, setColumnNumber] = useState(2);
    const { language } = useContext(LangContext);

    // Al pinchar en una plantilla, debo guardarlo y luego desplazarme a ella.
    async function handleTemplate(template) {
        const newId = uuid.v4();
        const noteToSave = { ...template, id: newId };
        await save({ note: noteToSave, noteSavedId: newId, hasDraws: false });
        router.push({ pathname: "/note", params: { id: newId, source: "template" } });
    }

    return (
        <View style={layout.flex}>
            <PinkPatternBackground />
            <Stack.Screen options={{ header: () => <HeaderTemplates {...{ setColumnNumber, columnNumber }} /> }} />

            <View style={[layout.flex, layout.paddingHorizontal, gap.big]}>
                <Text style={[ui.h2, ui.black, { marginVertical: 16 }]}>{language.t("_templatesTitle")}</Text>
                <FlatList
                    key={columnNumber}
                    numColumns={columnNumber}
                    data={TEMPLATES}
                    contentContainerStyle={layout.contentList}
                    columnWrapperStyle={columnNumber > 1 ? gap.medium : null}
                    renderItem={({ item }) => (
                        <View style={{ flex: 1 / columnNumber }}>
                            <NoteItem
                                note={item}
                                onPress={handleTemplate}
                                isTemplate={true}
                            />
                        </View>
                    )}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {

    }
})