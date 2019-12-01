namespace T03_Camera {

    import fudge = FudgeCore;

    export interface Transformation {
        translation?: fudge.Vector3;
        rotation?: fudge.Vector3;
    }
 
    export interface Transformations {
        [keycode: string]: Transformation;
    }

    export interface Collision {
        element: GridElement;
        cube: Cube;
    }

    export class Control extends fudge.Node {
        public static transformations: Transformations = Control.defineControls();
        private fragment: Fragment;

        constructor() {
            super("Control");
            this.addComponent(new fudge.ComponentTransform());
        }

        public static defineControls(): Transformations {
            let controls: Transformations = {};
            controls[fudge.KEYBOARD_CODE.ARROW_UP] = { rotation: fudge.Vector3.X(-1) };
            controls[fudge.KEYBOARD_CODE.ARROW_DOWN] = { rotation: fudge.Vector3.X(1) };
            controls[fudge.KEYBOARD_CODE.ARROW_LEFT] = { rotation: fudge.Vector3.Y(-1) };
            controls[fudge.KEYBOARD_CODE.ARROW_RIGHT] = { rotation: fudge.Vector3.Y(1) };
            controls[fudge.KEYBOARD_CODE.W] = { translation: fudge.Vector3.Z(-1) };
            controls[fudge.KEYBOARD_CODE.S] = { translation: fudge.Vector3.Z(1) };
            controls[fudge.KEYBOARD_CODE.A] = { translation: fudge.Vector3.X(-1) };
            controls[fudge.KEYBOARD_CODE.D] = { translation: fudge.Vector3.X(1) };
            controls[fudge.KEYBOARD_CODE.SHIFT_LEFT] = controls[fudge.KEYBOARD_CODE.SHIFT_RIGHT] = { translation: fudge.Vector3.Y(1) };
            controls[fudge.KEYBOARD_CODE.CTRL_LEFT] = controls[fudge.KEYBOARD_CODE.CTRL_RIGHT] = { translation: fudge.Vector3.Y(-1) };
            return controls;
        }

        public setFragment(_fragment: Fragment): void {
            for (let child of this.getChildren())
                this.removeChild(child);
            this.appendChild(_fragment);
            this.fragment = _fragment;
        }

        public move(_transformation: Transformation): void {
            let mtxContainer: fudge.Matrix4x4 = this.cmpTransform.local;
            let mtxFragment: fudge.Matrix4x4 = this.fragment.cmpTransform.local;
            mtxFragment.rotate(_transformation.rotation, true);
            mtxContainer.translate(_transformation.translation);
        }

        public checkCollisions(_transformation: Transformation): Collision[] {
            let mtxContainer: fudge.Matrix4x4 = this.cmpTransform.local;
            let mtxFragment: fudge.Matrix4x4 = this.fragment.cmpTransform.local;
            let save: fudge.Mutator[] = [mtxContainer.getMutator(), mtxFragment.getMutator()];
            mtxFragment.rotate(_transformation.rotation, true);
            mtxContainer.translate(_transformation.translation);

            fudge.RenderManager.update();

            let collisions: Collision[] = [];
            for (let cube of this.fragment.getChildren()) {
                let element: GridElement = grid.pull(cube.mtxWorld.translation);
                if (element)
                    collisions.push({ element, cube });
            }

            mtxContainer.mutate(save[0]);
            mtxFragment.mutate(save[1]);

            return collisions;
        }

        public freeze(): void {
            for (let cube of this.fragment.getChildren()) {
                let position: fudge.Vector3 = cube.mtxWorld.translation;
                cube.cmpTransform.local.translation = position;
                grid.push(position, new GridElement(cube));
            }
        }
    }
}
