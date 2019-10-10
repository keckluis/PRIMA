namespace L02_FirstFudge {

    import f = FudgeCore;

    window.addEventListener("load", handleLoad);

    function handleLoad(_event: Event): void {

        const canvas = document.querySelector("canvas");
        console.log(canvas);

        let viewport: f.Viewport = new f.Viewport();
        
    }
}