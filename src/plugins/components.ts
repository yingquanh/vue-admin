import Wrapper from "@/components/Wrapper";
import CustomTable from "@/components/CustomTable";
import CustomButton from "@/components/CustomButton";
import CustomFilter from "@/components/CustomFilter";
import CustomSeniorFilter from "@/components/CustomSeniorFilter";

const components = [
    Wrapper,
    CustomTable,
    CustomButton,
    CustomFilter,
    CustomSeniorFilter,
];

/**
 * 注册全局自定义组件
 */
export default {
    install: (app: any) => {
        components.forEach((component: any) => {
            app.component(component.name, component);
        });
    }
}