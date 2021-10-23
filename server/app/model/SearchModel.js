const { query } = require('../boot')
module.exports = class SearchModel {

    constructor(db) {
        this.db = db;
    }


   static search = async (province, department , page , words , lastId) => {
        province = parseInt(province)
        page = parseInt(page)
        lastId   = parseInt(lastId)
        department = parseInt(department)
        words = String(words)
        const commands = []
     
        if (province !== -1) {
            commands.push({
                cmd: ' AND university_tb_id = (SELECT id FROM university_tb WHERE city_tb_id=(SELECT id FROM city_tb WHERE province_tb_id=(SELECT id FROM province_tb WHERE id=NUM))) ',
                value: province
            })
        }
    
        if (department !== -1) {
            commands.push({
                cmd: ' AND departmant_tb_id = NUM ',
                value: department
            })
        }
        
        const offset = page === 1 ? 0 : page
        lastId = page === 1 ? 0 : lastId
     
        return await this.searchWordsAll(commands , words , offset , lastId);
}
    


    static searchWordsAll = async (commands , words , page , lastId) => {
        try {
            let sql = `SELECT sub.id                        as class_id,
                              teacher_tb.name               as teacher_name,
                              teacher_tb.family             as teacher_family,
                              department_tb.department_name as department,
                              university_tb.name            as university_name,
                              sub.title                     as title,
                              sub.description               as description,
                              sub.password                  as password
                       FROM (SELECT *
                             FROM class_tb
                             WHERE title LIKE '%' || $1 || '%'
                                OR class_code LIKE '%' || $1 || '%'
                                OR description LIKE '%' || $1 || '%'
                                OR teacher_tb_id = (SELECT id FROM teacher_tb
                                                    WHERE name LIKE '%' || $1 || '%' OR family LIKE '%' || $1 || '%' )
                             ORDER BY id LIMIT 2 OFFSET $2) sub
                                JOIN teacher_tb    ON teacher_tb.id = teacher_tb_id
                                JOIN department_tb ON department_tb.id = departmant_tb_id
                                JOIN university_tb ON university_tb.id = university_tb_id
                       WHERE sub.id > $3 `;
            const inputs = [words , page , lastId]
            commands.forEach((value , index) => {
                sql = sql.concat(value.cmd.replace('NUM' , `$${index + 4} `))
                inputs.push(value.value)
            })
          
            sql = sql.concat(' ORDER BY sub.id')
            const result = await query(sql , inputs);
            if (result.rowCount > 0) {
                return result.rows
            } else {
                return 'NOT_FOUND'
            }

        } catch (err) {
            console.log('searchWordsAll ', err.message);
            return false
        }
    }
}
