import { TextAreaWidgetComponent } from "../components/widget/test-area-widget/text-area-widget.component";
import { DefaultWidgetRegistry } from "ngx-schema-form";

export class CustomWidgetRegistry extends DefaultWidgetRegistry {
  constructor() {
    super();

    this.register("textArea", TextAreaWidgetComponent);
  }
}