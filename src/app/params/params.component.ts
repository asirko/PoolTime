import { Component, OnDestroy, OnInit } from '@angular/core';
import { Param, ParamsService } from './params.service';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'pt-params',
  templateUrl: './params.component.html',
  styleUrls: ['./params.component.scss']
})
export class ParamsComponent implements OnInit, OnDestroy {

  paramsForm: FormGroup;
  params: Param[];
  formSub: Subscription;

  get paramsFormArray(): FormArray {
    // must be done on controller side because without it the type checking made in template for AOT throw errors
    return <FormArray> this.paramsForm.get('params');
  }

  constructor(private fb: FormBuilder,
              private paramsService: ParamsService) { }

  ngOnInit() {
    this.params = this.paramsService.getParams();

    this.paramsForm = this.fb.group({
      params: this.fb.array([])
    });
    this.params.forEach(p => this.addExperience(p));

    this.formSub = this.paramsForm.valueChanges.pipe(
      map(form => form.params),
      tap(params => this.paramsService.setParams(params))
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.formSub.unsubscribe();
  }

  createParam(param?: Param): FormGroup {
    return this.fb.group({
      type: (param && param.type) || '',
      number: (param && param.number) || 0,
      hourRate: (param && param.hourRate) || 0
    });
  }

  addExperience(param?: Param): void {
    const experiences = <FormArray> this.paramsForm.get('params');
    experiences.push(this.createParam(param));
  }

  deleteExperience(index: number): void {
    const experiences = <FormArray> this.paramsForm.get('params');
    experiences.removeAt(index);
  }


}
