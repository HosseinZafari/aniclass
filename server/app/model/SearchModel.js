module.exports = class SearchModel {

    constructor(db) {
        this.db = db;
    }


    search = async ({city, uni, department, words}) => {
        city = parseInt(city)
        uni = parseInt(uni)
        department = parseInt(department)
        words = String(words)

        if (city === -1 && uni === -1 && department === -1) {
            console.log('without filter')
            return await this.searchWordsAll(words);
        } else {
            console.log('with filter')
            return await this.searchWordsAndCategory(city, uni, department, words);
        }
    }


    searchWordsAndCategory = async (city, uni, department, words) => {
        try {
            const sqlCommand = [
                {
                    type: 'uni',
                    value: uni,
                    cmd: ' AND university_tb_id = $',
                    counter: null
                },
                {
                    type: 'department',
                    value: department,
                    cmd: ' AND departmant_tb_id = $',
                    counter: null
                },
                {
                    type: 'city',
                    value: city,
                    cmd: ' AND university_tb_id = (SELECT id FROM university_tb WHERE city_tb_id = (SELECT id FROM city_tb WHERE province_tb_id = (SELECT id FROM province_tb WHERE id = $',
                    counter: null
                }
            ]

            let sql = 'SELECT * FROM class_tb WHERE TRUE ';
            var counter = 1;
            sqlCommand.forEach((value, i) => {
                if (value.value == -1) {
                    delete sqlCommand[i];
                }
            });

            sqlCommand.forEach((value, i) => {
                if (value.type === 'city') {
                    sql += value.cmd + counter + ')))';
                } else {
                    sql += value.cmd + counter;
                }
                sqlCommand[i].counter = counter;
                counter++;
            })
            const getRowsIndex = () => {
                const array = [];
                for (let i = 1; i < counter; i++) {
                    sqlCommand.forEach((value => {
                        if (value.counter === i) {
                            array.push(value.value)
                        }
                    }))
                }
                array.push(words)
                return array;
            }

            const fullQuery = `SELECT sub2.id  as id, teacher_tb.name as teacher_name, teacher_tb.family as teacher_family, department_tb.department_name as department, university_tb.name as uni, sub2.title as title
                                                     FROM (SELECT *
                                                           FROM ( ${sql} ) sub
                                                           WHERE title LIKE '%'||$${counter}||'%'
                                                              OR class_code LIKE '%'||$${counter}||'%'
                                                              OR description LIKE '%'||$${counter}||'%'
                                                              OR teacher_tb_id =
                                                                 (SELECT id
                                                                  FROM teacher_tb
                                                                  WHERE name LIKE '%'||$${counter}||'%'
                                                                     OR family LIKE '%'||$${counter}||'%')
                                                          ) sub2
                                                              JOIN university_tb ON sub2.university_tb_id = university_tb.id
                                                              JOIN department_tb ON sub2.departmant_tb_id = department_tb.id
                                                              JOIN teacher_tb ON sub2.teacher_tb_id = teacher_tb.id`;

            const result = await this.db.pool.query(fullQuery, getRowsIndex(counter));
            if (result.rowCount > 0) {
                return {status: 'success', rows: result.rows};
            } else {
                return {status: 'not_found'};
            }
        } catch (err) {
            console.log(err);
            return {success: 'error'}
        }
    }


    searchWordsAll = async (words) => {
        try {
            const result = await this.db.pool.query(`SELECT sub.id                        as id,
                                                            teacher_tb.name               as teacher_name,
                                                            teacher_tb.family             as teacher_family,
                                                            department_tb.department_name as department,
                                                            university_tb.name            as uni,
                                                            sub.title                     as title
                                                     FROM (SELECT *
                                                           FROM class_tb
                                                           WHERE title LIKE '%' || $1 || '%'
                                                              OR class_code LIKE '%' || $1 || '%'
                                                              OR description LIKE '%' || $1 || '%'
                                                              OR teacher_tb_id = (SELECT id
                                                                                  FROM teacher_tb
                                                                                  WHERE name LIKE '%' || $1 || '%'
                                                                                     OR family LIKE '%' || $1 || '%')
                                                           ORDER BY id DESC) sub
                                                              JOIN teacher_tb ON teacher_tb.id = teacher_tb_id
                                                              JOIN department_tb ON department_tb.id = departmant_tb_id
                                                              JOIN university_tb ON university_tb.id = university_tb_id`, [words]);
            if (result.rowCount > 0) {
                return {status: 'success', rows: result.rows};
            } else {
                return {status: 'not_found'};
            }

        } catch (err) {
            console.log('searchWordsAll ', err.message);
            return {status: "error"};
        }
    }
}