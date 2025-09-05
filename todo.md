## Todo

- Añadir traducciones en settings-container (toasts informativos)
- Añadir traducciones en settings (label que acompaña a los sliders)
- Actualizar notas de version (v4):
    - Subrayar
    - Resaltar
    - Cambiar color de las letras
    - Permitir cambiar el espacio entre párrafos
    - Permitir cambiar el espacio entre letras
    - Permitir cambiar el espacio entre palabras


## Crashes

- Ir desde una nota a settings y volver atrás provoca crash por variable font a null y es que parece ser que el estado isReady se mantiene como true aunque haya cambiado y debe provocar un setIsReady a false si se desplaza de la nota.

## Errores

- En algunos casos, al acceder a una nota se me guarda en favoritos