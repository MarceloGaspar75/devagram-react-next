export class LoadingHelper {
    static exibir() {
        document
            .querySelector('.loadinContainer')
            ?.classList.remove('oculto');
    }
    static ocultar() {
        setTimeout(() => {
            document
                .querySelector('.loadinContainer')
                ?.classList.add('oculto');

        }, 500);


    }
}