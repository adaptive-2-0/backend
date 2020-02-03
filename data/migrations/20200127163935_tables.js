exports.up = function(knex) {
    return knex.schema.createTable('roles', tbl => {
      tbl.increments();
      tbl.string('name', 128).notNullable().unique();
    })
    .createTable('genders', tbl => {
      tbl.increments();
      tbl.string('gender', 128).notNullable().unique();
    })
    .createTable('disability_groups', tbl => {
      tbl.increments();
      tbl.string('name', 128).notNullable().unique();
    })
    .createTable('attendee_types', tbl => {
      tbl.increments();
      tbl.string('name', 128).notNullable().unique()
    })
    .createTable('disabilities', tbl => {
      tbl.increments();
      tbl.string('name', 128).notNullable().unique();
      tbl.integer('disability_group_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('disability_groups')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')  
    })    
    .createTable('users', tbl => {
      tbl.increments();
      tbl.string('email', 128).notNullable().unique();
      tbl.string('password', 128).notNullable();
      tbl.boolean('underage').notNullable().defaultTo(true);
      tbl.string('username', 60).notNullable().unique();
      tbl.string('firstname', 128).notNullable();
      tbl.string('lastname', 128).notNullable();
      tbl.date('dob');
      tbl.string('bio', 500);
      tbl.string('picture', 500)
      .defaultTo('https://prd-wret.s3-us-west-2.amazonaws.com/assets/palladium/production/s3fs-public/styles/full_width/public/thumbnails/image/Placeholder_person.png')
      tbl.integer('disability_id')
        .unsigned()
        .references('id')
        .inTable('disabilities')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')  
      tbl.integer('gender_id')
        .unsigned()
        .references('id')
        .inTable('genders')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')   
      tbl.integer('role_id')
        .unsigned()
        .references('id')
        .inTable('roles')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')          
    });
}
  exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('users')
    .dropTableIfExists('disabilities')
    .dropTableIfExists('attendee_types')
    .dropTableIfExists('disability_groups')
    .dropTableIfExists('genders')
    .dropTableIfExists('roles')
  };