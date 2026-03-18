import { Component, inject, Input, OnInit } from "@angular/core";
import { ContactPerson } from "@app/contact-person/contact-person.model";
import { _, TranslatePipe, TranslateService } from "@ngx-translate/core";
import { FormsModule } from "@angular/forms";
import { ContactPersonEditComponent } from "@app/contact-person/contact-person-edit.component";

@Component({
  selector: "contact-person-list",
  templateUrl: "./contact-person-list.component.html",
  imports: [TranslatePipe, FormsModule, ContactPersonEditComponent],
})
export class ContactPersonListComponent  {
  private translate = inject(TranslateService);

  // https://v17.angular.io/guide/component-interaction
  @Input() contactPersons: ContactPerson[];

  constructor() {}

  addContactPerson(): void {
    this.contactPersons.push(new ContactPerson());
  }

  removeContactPerson(index: number, contactPerson: ContactPerson): () => void {
    return () => {
      // Ask for confirmation before removing an existing contact person.
      if (contactPerson.id) {
        const message = this.translate
          .get(_("APPLICATION.METADATA-FIELD.CONTACT-PERSONS-ACTION-REMOVE-CONFIRM"), {
            name: contactPerson.name,
          })
          .subscribe((message: string) => {
            if (confirm(message)) {
              this.contactPersons.splice(index, 1);
            }
          });
      } else {
        this.contactPersons.splice(index, 1);
      }
    }
  }
}
